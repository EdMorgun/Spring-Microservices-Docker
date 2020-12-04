package com.example.searchservice.repository;

import com.example.searchservice.domain.room;
import com.example.searchservice.domain.feedback;
import com.example.searchservice.domain.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<feedback, Integer> {
    List<feedback> findAllByUserid(user user);
    List<feedback> findAllByRoomid(room room);
}