package com.example.searchservice.client;

import com.example.searchservice.domain.booking;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;

@FeignClient(value = "booking")
@RequestMapping("/booking")
public interface BookingClient {
    @GetMapping("/getall")
    Iterable<booking> getAllBookings();

    @GetMapping("/getall/byuser/{username}")
    List<booking> getAllBookingsByUser(@PathVariable(name="username") String username);

    @GetMapping("/getall/byroom/{roomid}")
    List<booking> getAllBookingsByRoom(@PathVariable(name="roomid") Integer roomid);

    @GetMapping("/getby/{id}")
    Optional<booking> getBookingById(@PathVariable(name="id") Integer id);

    @GetMapping("/new/{username}/{roomid}/{time}")
    booking createBooking(@PathVariable(name="username") String user_name,
                               @PathVariable(name="roomid") Integer roomid,
                               @PathVariable(name="time") String time);

    @DeleteMapping("/del/{id}")
    void deleteBooking(@PathVariable(name="id") int id);
}
