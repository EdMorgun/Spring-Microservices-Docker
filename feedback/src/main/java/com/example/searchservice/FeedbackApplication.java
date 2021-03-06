package com.example.searchservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableDiscoveryClient
@ServletComponentScan
@EnableFeignClients
public class FeedbackApplication {
	public static void main(String[] args) {
		SpringApplication.run(FeedbackApplication.class, args);
	}
}
