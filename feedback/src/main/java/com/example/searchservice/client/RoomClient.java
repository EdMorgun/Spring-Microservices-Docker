package com.example.searchservice.client;

import com.example.searchservice.domain.room;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@FeignClient(value = "search")
@RequestMapping("/room")
public interface RoomClient {

    @GetMapping("/getall")
    Iterable<room> getAllRooms();

    @GetMapping("/getby/{id}")
    Optional<room> getRoomById(@PathVariable(name="id") int id);

    @PostMapping("/add")
    room createRoom(@RequestBody room room);

    @GetMapping("/countaver/{id}")
    room getCountaver(@PathVariable(name="id") int id);

    @DeleteMapping("/del/{id}")
    void deleteRoom(@PathVariable(name="id") int id);
}
