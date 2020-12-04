package com.example.authservice.controller;

import com.example.authservice.domain.user;
import com.example.authservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RefreshScope
@RestController
@RequestMapping("/client")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/getall")
    public Iterable<user> getAllUsers() { return userRepository.findAll(); }

    @GetMapping("/getby/{id}")
    public Optional<user> getUserById(@PathVariable(name="id") int id) { return userRepository.findById(id); }

    @GetMapping("/getby/name/{username}")
    public user getUserByName(@PathVariable(name="username") String username) { return userRepository.findByUsername(username); }

    @PostMapping("/add")
    public user createUser(@RequestBody user user) {
        return userRepository.save(user);
    }

    @DeleteMapping("/del/{id}")
    public void deleteUser(@PathVariable(name="id") int id) {
        userRepository.deleteById(id);
    }
}
