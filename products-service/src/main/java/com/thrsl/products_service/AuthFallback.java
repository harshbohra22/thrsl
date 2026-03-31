package com.thrsl.products_service;

import org.springframework.stereotype.Component;

@Component
public class AuthFallback implements AuthClient {

    @Override
    public String getAuthStatus() {
        return "Auth Service is temporarily unavailable (Fallback from Feign) 🛠️";
    }
}
