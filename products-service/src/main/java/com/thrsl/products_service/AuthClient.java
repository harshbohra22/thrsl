package com.thrsl.products_service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "auth-service", fallback = AuthFallback.class)
public interface AuthClient {

    @GetMapping("/auth/status")
    String getAuthStatus();
}
