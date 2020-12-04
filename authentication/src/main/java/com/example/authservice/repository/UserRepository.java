package com.example.authservice.repository;

import com.example.authservice.domain.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<user, Integer> {
    user findByUsername(String username);
}