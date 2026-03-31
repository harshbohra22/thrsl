package com.thrsl.gateway_service;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class FallbackController {

    @GetMapping("/fallback/products")
    public Mono<String> productsFallback() {
        return Mono.just("Products Service is taking too long to respond or is down. Please try again later.");
    }

    @GetMapping("/fallback/auth")
    public Mono<String> authFallback() {
        return Mono.just("Auth Service is currently unavailable. Please try again later.");
    }
}
