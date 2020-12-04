package com.example.searchservice.repository;

import com.example.searchservice.domain.booking;
import com.example.searchservice.domain.room;
import com.example.searchservice.domain.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<booking, Integer> {
    List<booking> findAllByUserid(user user);
    List<booking> findAllByRoomid(room room);
}