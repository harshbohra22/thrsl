package com.thrsl.products_service;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
public class ProductController {

    @GetMapping
    public String getProductsRoot() {
        return "Welcome to the Products Service API! The routing from API Gateway is working successfully!";
    }

    @GetMapping("/hello")
    public String getHelloProduct() {
        return "Hello from Products Service! Routing is working successfully via API Gateway!";
    }
}
