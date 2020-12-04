package com.example.searchservice.client;

import com.example.searchservice.domain.feedback;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@FeignClient(value = "feedback")
@RequestMapping("/feedback")
public interface FeedbackClient {

    @GetMapping("/getall")
    Iterable<feedback> getAllFeedback();

    @GetMapping("/getall/{username}")
    List<feedback> getAllFeedbackByUser(@PathVariable(name="username") String username);

    @GetMapping("/getall/feed/{roomid}")
    List<feedback> getAllFeedbackByRoom(@PathVariable(name="roomid") Integer roomid);

    @GetMapping("/getaver/mark/{roomid}")
    Double getAllAverMarkByRoom(@PathVariable(name="roomid") Integer roomid);

    @GetMapping("/getby/{id}")
    Optional<feedback> getFeedbackById(@PathVariable(name="id") int id);

    @PostMapping("/new/{username}/{appointment_id}/{mark}")
    feedback createFeedback(@PathVariable(name="username") String username,
                                   @PathVariable(name="appointment_id") Integer appointment_id,
                                   @PathVariable(name="mark") Integer mark,
                                   @RequestBody String body);

    @DeleteMapping("/del/{id}")
    void deleteFeedback(@PathVariable(name="id") int id);
}
