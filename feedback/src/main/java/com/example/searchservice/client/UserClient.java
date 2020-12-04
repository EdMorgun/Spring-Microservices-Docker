package com.example.searchservice.client;

import com.example.searchservice.domain.user;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@FeignClient(value = "authentication")
@RequestMapping("/client")
public interface UserClient {

    @GetMapping("/getall")
    Iterable<user> getAllUsers();

    @GetMapping("/getby/{id}")
    Optional<user> getUserById(@PathVariable(name="id") int id);

    @GetMapping("/getby/name/{username}")
    user getUserByName(@PathVariable(name="username") String username);

    @PostMapping("/add")
    user createUser(@RequestBody user user);

    @DeleteMapping("/del/{id}")
    void deleteUser(@PathVariable(name="id") int id);
}
