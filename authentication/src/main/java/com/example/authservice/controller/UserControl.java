package com.example.authservice.controller;

import com.example.authservice.config.Iconstants;
import com.example.authservice.domain.Role;
import com.example.authservice.domain.user;
import com.example.authservice.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Optional;

@Controller
public class UserControl {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/registration")
    public ResponseEntity<?> registration(@RequestBody user user) {
        user.setActive(true);
        user.setRoles(Collections.singleton(Role.USER));
        //user.setRoles(new HashSet<>(Arrays.asList(Role.USER, Role.ADMIN)));
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        Optional<user> clientFromDb = Optional.ofNullable(userRepository.findByUsername(user.getUsername()));
        if (clientFromDb.isPresent()) {
            return ResponseEntity.ok(null);
        }
        return ResponseEntity.ok(userRepository.save(user));
    }

    @PostMapping("/getusername")
    public ResponseEntity<?> check(@RequestBody String bearerTkn) {
        try {
            Jws<Claims> claims = Jwts.parser().requireIssuer(Iconstants.ISSUER).setSigningKey(Iconstants.SECRET_KEY).parseClaimsJws(bearerTkn);
            return ResponseEntity.ok((String) claims.getBody().get("usr"));
        } catch (SignatureException e) {
            return new ResponseEntity("Invalid token.", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/isadmin")
    public ResponseEntity<?> isAdmin(@RequestBody String bearerTkn) {
        try {
            Jws<Claims> claims = Jwts.parser().requireIssuer(Iconstants.ISSUER).setSigningKey(Iconstants.SECRET_KEY).parseClaimsJws(bearerTkn);
            return ResponseEntity.ok(claims.getBody().get("rol").equals("ADMIN, USER"));
        } catch (SignatureException e) {
            return ResponseEntity.ok(false);
        }
    }
}
