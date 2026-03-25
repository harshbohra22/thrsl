package com.thrsl.products_service;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
public class ProductController {

    @GetMapping
    public String getProductsRoot() {
        return "Welcome ji";
    }

    @GetMapping("/hello")
    public String getHelloProduct() {
        return "Hello  lelo";
    }
}
