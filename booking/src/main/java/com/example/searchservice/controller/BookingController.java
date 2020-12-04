package com.example.searchservice.controller;

import com.example.searchservice.client.RoomClient;
import com.example.searchservice.client.UserClient;
import com.example.searchservice.domain.booking;
import com.example.searchservice.domain.room;
import com.example.searchservice.domain.user;
import com.example.searchservice.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@RefreshScope
@RestController
@RequestMapping("/booking")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private UserClient userClient;
    @Autowired
    private RoomClient roomClient;

    @GetMapping("/getall")
    public Iterable<booking> getAllBookings() { return bookingRepository.findAll(); }

    @GetMapping("/getall/byuser/{username}")
    public List<booking> getAllBookingsByUser(@PathVariable(name="username") String username) {
        user user = userClient.getUserByName(username);
        return bookingRepository.findAllByUserid(user);
    }

    @GetMapping("/getall/byroom/{roomid}")
    public List<booking> getAllBookingsByUser(@PathVariable(name="roomid") Integer roomid) {
        Optional<room> room = roomClient.getRoomById(roomid);
        if(room.isEmpty()) { return null; }
        return bookingRepository.findAllByRoomid(room.get());
    }

    @GetMapping("/getby/{id}")
    public Optional<booking> getBookingById(@PathVariable(name="id") Integer id) {
        return bookingRepository.findById(id);
    }

    @PostMapping("/new/{username}/{roomid}")
    public booking createBooking(@PathVariable(name="username") String username,
                                   @PathVariable(name="roomid") Integer roomid,
                                 @RequestParam(name="checkindate") String checkindate,
                                 @RequestParam(name="evictiondate") String evictiondate
                                ) {
        booking booking = new booking();
        user user = userClient.getUserByName(username);
        room room = roomClient.getRoomById(roomid).get();
        booking.setUserid(user);
        booking.setRoomid(room);
        booking.setCheckInDate(Date.valueOf(checkindate));
        booking.setEvictionDate(Date.valueOf(evictiondate));
        return bookingRepository.save(booking);
    }

    @DeleteMapping("/del/{id}")
    public void deleteBooking(@PathVariable(name="id") int id) {
        bookingRepository.deleteById(id);
    }
}
