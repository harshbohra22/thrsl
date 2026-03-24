package com.thrsl.products_service;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
public class ProductController {

    @GetMapping("/hello")
    public String getHelloProduct() {
        return "Hello from Products Service! Routing is working successfully via API Gateway!";
    }
}
