package com.example.apigateway.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {
    @GetMapping("/")
    public String main() {
        return "main";
    }

    @GetMapping("/rooms")
    public String rooms() {
        return "rooms";
    }

    @GetMapping("/orders")
    public String orders() {
        return "orders";
    }

    @GetMapping("/admin")
    public String admin() {
        return "admin";
    }
}