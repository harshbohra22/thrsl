# THRS Microservices POC – Project Overview (Hinglish Version)

Bhai, is document mein humne ab tak jo kuch bhi kiya hai, uska poora hisab-kitab asaan bhasha mein likha hai. Isse tumhe poora project structure samajhne mein help milegi.

---

## 1. Project Architecture (Main Structure)

Humne Spring Boot 3 use karke **5 Microservices** banayi hain, jo ek dusre se aise connect hoti hain:

1.  **Config Service (Port 8888)**: Yeh project ka **"Brain"** hai. Saari services ke passwords, database URLs aur ports yahan store hote hain.
2.  **Discovery Service (Eureka Server - Port 8761)**: Yeh ek **"Phone Directory"** ki tarah hai. Jab bhi koi service start hoti hai, woh iske paas register hoti hai taaki doosri services use dhundh saken.
3.  **Gateway Service (Port 8080)**: Yeh project ka **"Main Gate"** hai. Bahar ki duniya sirf isse baat karti hai, aur yeh request ko sahi service tak bhejta hai.
4.  **Auth Service**: Security aur login check karne ke liye.
5.  **Products Service**: Business logic aur products data manage karne ke liye.

---

## 2. Maven Multi-Module Setup (Kya aur Kyun?)

Pehle saare folder alag-alag the. Humne ek **Root POM (`pom.xml`)** banayi hai jo in sabko ek saath bandhti hai.

*   **Aggregator POM**: Root folder mein jo `pom.xml` hai, woh ek aggregator hai. Iska faida yeh hai ki tum root se ek hi command (`./mvnw clean install`) chala kar saari services ek saath build kar sakte ho.
*   **Standalone Services**: Har service ki apni `pom.xml` alag bhi hai taaki woh independent rah sake (Docker ke liye yeh bahut zaroori hai).

---

## 3. Maven Wrapper (`mvnw`)

Tumne code mein dekha hoga `mvnw` aur `mvnw.cmd` files hain. 
*   Inka kaam yeh hai ki agar tumhare PC mein Maven installed **nahi** bhi hai, toh bhi yeh files internet se apne aap sahi version download karke project build kar dengi. 
*   Tumhe sirf `./mvnw` command chalani padti hai.

---

## 4. Docker & Orchestration

Humne **Docker** use kiya hai taaki project setup mein koi jhanjhat na ho.

*   **Dockerfiles**: Har service ke andar ek `Dockerfile` hai jo use Java aur system setup ke saath package karti hai.
*   **Docker-Compose (`docker-compose.yml`)**: Yeh file batati hai ki saari services ko kis order mein start karna hai. Jaise:
    1.  Pehle `config-service` start hogi.
    2.  Phir `discovery-service`.
    3.  Uske baad baaki saari services.

**Docker ka Sabse Bada Fayda**: Tumhe apne computer mein Java ya Maven install karne ki zaroorat nahi padi, Docker ne sab kuch apne container ke andar hi manage kar liya!

---

## 5. Kaam Kaise Chalta Hai? (The Flow)

Jab tum browser mein `http://localhost:8080/products/hello` kholte ho:
1.  Request **Gateway** (8080) ke paas jaati hai.
2.  Gateway **Eureka Discovery** (8761) se puchta hai: *"Bhai, Products-Service kahan hai?"*
3.  Eureka address deta hai (jaise `IP:8081`).
4.  Gateway request ko **Products Service** tak bhejta hai.
5.  Products Service result wapas Gateway ko deta hai, jo tumhe browser mein dikhta hai.

---

**Summary**: Ab tumhare paas ek ready-to-use microservices stack hai jo Docker par chalta hai aur root POM se manage hota hai. Ab tum bas code likhne par dhyan de sakte ho!
