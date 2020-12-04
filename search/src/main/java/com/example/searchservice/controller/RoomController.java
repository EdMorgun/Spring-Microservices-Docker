package com.example.searchservice.controller;

import com.example.searchservice.client.FeedbackClient;
import com.example.searchservice.domain.room;
import com.example.searchservice.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RefreshScope
@RestController
@RequestMapping("/room")
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private FeedbackClient feedbackClient;

    @GetMapping("/getall")
    public Iterable<room> getAllRooms() {
        Iterable<room> rooms = roomRepository.findAll();

        return rooms;
    }

    @GetMapping("/countaver/{id}")
    public room getCountaver(@PathVariable(name="id") int id) {
        room room = roomRepository.findById(id).get();
        room.setAvermark(feedbackClient.getAllAverMarkByRoom(id));
        return roomRepository.save(room);
    }

    @GetMapping("/getby/{id}")
    public Optional<room> getRoomById(@PathVariable(name="id") int id) { return roomRepository.findById(id); }

    @PostMapping("/add")
    public room createRoom(@RequestBody room room) {
        return roomRepository.save(room);
    }

    @DeleteMapping("/del/{id}")
    public void deleteRoom(@PathVariable(name="id") int id) {
        roomRepository.deleteById(id);
    }
}
