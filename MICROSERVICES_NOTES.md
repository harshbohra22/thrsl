# Spring Boot 3 Microservices — Complete Notes

> These notes were generated during the setup of the `thrsl-backend-poc` microservices project.
> Date: 23 March 2026

---

## Table of Contents
1. [Prerequisites](#1-prerequisites)
2. [Project Structure](#2-project-structure)
3. [Config Service — Centralized Configuration](#3-config-service--centralized-configuration)
4. [Discovery Service — Service Registry (Netflix Eureka)](#4-discovery-service--service-registry-netflix-eureka)
5. [Gateway Service — API Gateway (Single Entry Point)](#5-gateway-service--api-gateway-single-entry-point)
6. [How All Three Are Connected](#6-how-all-three-are-connected)
7. [Dynamic Port Assignment](#7-dynamic-port-assignment)
8. [Orchestration](#8-orchestration)
9. [How to Run & Test](#9-how-to-run--test)

---

## 1. Prerequisites

| Requirement | Version |
|---|---|
| Java | **17** (minimum for Spring Boot 3.x). Java 21 also supported. |
| Spring Boot | **3.3.x** |
| Spring Cloud | **2023.0.x (Leyton)** — compatible with Spring Boot 3.2.x/3.3.x |
| Build Tool | Maven |

> **Important:** Java 8 is NOT supported with Spring Boot 3.x. Mixing mismatched Spring Boot and Spring Cloud versions causes build failures.

---

## 2. Project Structure

```
thrsl-backend-poc/
├── config-service/        (Port 8888 — Spring Cloud Config Server)
├── discovery-service/     (Port 8761 — Eureka Server)
├── gateway-service/       (Port 8080 — API Gateway, PUBLIC)
├── auth-service/          (Port: Dynamic — Authentication)
└── products-service/      (Port: Dynamic — Products Business Logic)
```

---

## 3. Config Service — Centralized Configuration

### Kya karta hai?
Config Service sabhi microservices ki settings (database URLs, passwords, ports, etc.) ko **ek jagah** par store karta hai, taaki hume har service mein jaake alag-alag settings likhni na padein.

### Problem jo solve karta hai:
- Agar 50 services hain aur database password change karna hai, toh bina Config Service ke 50 files mein jaake change karna padega.
- Config Service ke hone se sirf **ek jagah** change karo, baaki services apne aap nayi settings le lengi.

### Git Repository se Environment-Wise Configuration:
Production mein Config Service ek **private Git repo** se configuration files uthata hai. Har environment ki alag file hoti hai:

```
thrsl-configs/                    (Git Repo)
├── products-service-dev.yml      (localhost settings)  
├── products-service-uat.yml      (UAT/Testing settings)
├── products-service-prod.yml     (Production/Live settings)
├── auth-service-dev.yml
├── auth-service-uat.yml
├── auth-service-prod.yml
└── ...
```

Jab Products Service start hoti hai aur uska profile `dev` hai, toh Config Service Git repo se `products-service-dev.yml` dhundh kar settings de deta hai. Agar profile `prod` hai, toh `products-service-prod.yml` deta hai.

**Fayda:** Agar Production ka DB password badal gaya, toh sirf Git repo mein ek commit karo, kisi bhi service ka code touch nahi karna padta.

### Annotation used:
```java
@EnableConfigServer  // ConfigServiceApplication.java mein lagaya
```

### Key Config (application.yml):
```yaml
server:
  port: 8888
spring:
  profiles:
    active: native        # 'native' = local file system se config padhega
  cloud:
    config:
      server:
        native:
          search-locations: classpath:/config  # yahan par baaki services ki files hain
```

### Client services mein connection:
Baaki services (gateway, auth, products) ki `application.yml` mein yeh line hoti hai:
```yaml
spring:
  config:
    import: "optional:configserver:http://localhost:8888/"
```
Iska matlab: *"Main start hote waqt Config Service (8888) se apni settings maangungi."*

---

## 4. Discovery Service — Service Registry (Netflix Eureka)

### Kya karta hai?
Discovery Service ek **"Dynamic Phone Directory"** hai. Yeh is baat ka record rakhti hai ki konsi service kahan (kis IP aur Port par) chal rahi hai.

### Problem jo solve karta hai:
- Cloud mein servers ka IP achanak badal sakta hai.
- Dynamic ports (`port: 0`) use karne par random port milta hai.
- Ek service ki multiple copies alag-alag ports par chal sakti hain.
- Gateway ko kaise pata chalega ki Products Service kis jagah hai?

### Mechanism — 3 Steps:

**Step 1 — Registration (Hazari lagana):**
Jaise hi koi service start hoti hai, woh Eureka ke paas jaati hai:
*"Mera naam PRODUCTS-SERVICE hai, main IP 10.0.1.5, Port 57812 par hoon."*

Eureka ek table maintain karta hai:

| Service Name | Instance | IP:Port | Status |
|---|---|---|---|
| PRODUCTS-SERVICE | Instance-1 | 10.0.1.5:57812 | UP ✅ |
| PRODUCTS-SERVICE | Instance-2 | 10.0.1.8:61002 | UP ✅ |
| AUTH-SERVICE | Instance-1 | 10.0.2.3:49001 | UP ✅ |

**Step 2 — Discovery (Pata pochna):**
Gateway Eureka se poochta hai: *"PRODUCTS-SERVICE kahan hai?"*
Eureka jawab deta hai: `10.0.1.5:57812` aur `10.0.1.8:61002`
Gateway in mein se kisi ek par request bhej deta hai (Load Balancing).

**Step 3 — Heartbeat & Eviction:**
Har registered service **har 30 second** mein Eureka ko heartbeat bhejti hai: *"Main zinda hoon!"*
Agar 90 seconds tak heartbeat nahi aayi, toh Eureka us service ko apne register se **nikaal** deta hai. Ab Gateway ko kabhi dead service ka address nahi milega.

### Annotation used:
```java
@EnableEurekaServer  // DiscoveryServiceApplication.java mein lagaya
```

### Key Config (application.yml):
```yaml
server:
  port: 8761
eureka:
  client:
    register-with-eureka: false   # Khud ko register mat karo (kyunki yeh khud server hai)
    fetch-registry: false         # Doosron ki list mat maango
```

### Client services mein Eureka connection:
Baaki services ki config mein (Config Service ke through milti hai):
```yaml
eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
```

---

## 5. Gateway Service — API Gateway (Single Entry Point)

### Kya karta hai?
Gateway Service ek **"Main Gate / Receptionist"** hai. Bahar ki duniya (Internet, Mobile App, Frontend) sirf Gateway se baat karti hai, andar ki services se seedha baat nahi kar sakti.

### Problem jo solve karta hai:
- Agar saari 50 services public hon, toh hacker kisi bhi service par seedha attack kar sakta hai.
- Frontend ko 50 alag URLs yaad rakhne padenge.

### Architecture:
```
Internet (Public)         |     Private Network (Internal Only)
                          |
User/Mobile App ──────► Gateway ──────► Auth Service
                          |         ├──► Products Service  
                       FIREWALL     ├──► Payment Service
                          |         └──► Config/Discovery
                          |
  (Sirf Gateway dikhta    |    (Baaki sab completely hidden
   hai duniya ko)         |     hain duniya se)
```

### Gateway ke Important Features:

| Feature | Kya karta hai |
|---|---|
| **Routing** | `/products/**` wali requests ko Products Service par bhejta hai |
| **Authentication** | Har request par JWT Token check karta hai |
| **Rate Limiting** | Ek user 1 minute mein max 100 requests hi bhej sakta hai |
| **CORS** | Browser se aane wali cross-origin requests allow/block karta hai |
| **Logging** | Har request ka log rakhta hai |
| **Circuit Breaker** | Agar koi service down hai toh turant "Service unavailable" bata deta hai |

### Key Config (gateway-service.yml in config-service):
```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: products-service
          uri: lb://products-service     # lb:// = Load Balancer, Eureka se address uthata hai
          predicates:
            - Path=/products/**          # /products se shuru hone wali requests yahan jayengi
        - id: auth-service
          uri: lb://auth-service
          predicates:
            - Path=/auth/**
```

### Firewall Rules (Production mein):
- **ALLOW** — Port 8080 (Gateway) ko `0.0.0.0/0` (poori duniya) se.
- **DENY** — Baaki sabhi ports ko duniya se block. Sirf internal network se allowed.

---

## 6. How All Three Are Connected

### Combined Flow — Step by Step:

```
1. Config Service start hoti hai (Port 8888)
2. Discovery Service start hoti hai (Port 8761)
3. Products Service start hoti hai:
   a. Pehle Config Service (8888) se apni settings (DB password, port, etc.) le aati hai
   b. Phir Eureka (8761) par jaake apna naam aur address register karati hai
4. Gateway Service start hoti hai:
   a. Config Service se apni routing settings le aati hai
   b. Eureka par register ho jaati hai

Ab jab User request bhejta hai:
5. User → Gateway (8080) par request: GET /products/hello
6. Gateway dekhta hai /products = Products Service ke liye hai
7. Gateway Eureka se poochta hai: "Products Service kahan hai?"
8. Eureka batata hai: "10.0.1.5:57812"
9. Gateway request Products Service tak forward karta hai
10. Products Service response banake Gateway ko deta hai
11. Gateway user ko response bhejta hai
```

---

## 7. Dynamic Port Assignment

### Problem:
Agar fixed port (jaise 9001) use karein aur woh port kisi aur process ne rok rakha ho, toh service start hi nahi hogi ("Port already in use" error).

### Solution:
Config mein port `0` likhne se OS apne aap ek free random port assign karta hai:
```yaml
server:
  port: 0    # OS will assign a random free port like 57812, 61002, etc.
```

### Fayde:
- Kabhi "Port already in use" error nahi aayega.
- Ek hi service ki multiple copies (instances) ek machine par chal sakti hain.
- Eureka automatically naya random port Gateway ko bata deta hai.

> **Note:** Config Service (8888), Discovery Service (8761), aur Gateway (8080) ka port fix rakhte hain kyunki client/services ko unka address pata hona chahiye.

---

## 8. Orchestration

**Orchestration** ka matlab hai bahut saari independent microservices/containers ko **automated tareeke se manage karna**.

Jaise music orchestra mein ek Conductor sabhi musicians ko control karta hai, waise hi **Kubernetes** ya **Docker Swarm** jaise tools saari microservices ko manage karte hain:

| Feature | Kya karta hai |
|---|---|
| **Auto-Scaling** | Traffic badhne par automatically nayi copies start karna |
| **Self-Healing** | Crash hui service ko turant restart karna |
| **Deployment** | Bina downtime ke purane code ko naye code se replace karna |
| **Resource Management** | Har service ko kitni RAM/CPU milegi, yeh decide karna |

---

## 9. How to Run & Test

### Start order (sequence matters!):
1. **Config Service** — `mvn spring-boot:run` (Port 8888)
2. **Discovery Service** — `mvn spring-boot:run` (Port 8761)
3. **Auth Service** — `mvn spring-boot:run` (Random Port)
4. **Products Service** — `mvn spring-boot:run` (Random Port)
5. **Gateway Service** — `mvn spring-boot:run` (Port 8080)

### Verify:
- Eureka Dashboard: `http://localhost:8761` — sabhi registered services dikhni chahiye.
- Test via Gateway: `http://localhost:8080/products/hello` — Products Service se response aayega Gateway ke through.

---

*End of Notes*
