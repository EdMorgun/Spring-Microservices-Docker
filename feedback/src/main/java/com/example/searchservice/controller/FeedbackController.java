package com.example.searchservice.controller;

import com.example.searchservice.client.RoomClient;
import com.example.searchservice.client.BookingClient;
import com.example.searchservice.client.UserClient;
import com.example.searchservice.domain.room;
import com.example.searchservice.domain.feedback;
import com.example.searchservice.domain.user;
import com.example.searchservice.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

@RefreshScope
@RestController
@RequestMapping("/feedback")
public class FeedbackController {

    @Autowired
    UserClient userClient;
    @Autowired
    RoomClient roomClient;
    @Autowired
    BookingClient bookingClient;

    @Autowired
    private FeedbackRepository feedbackRepository;

    @GetMapping("/getall")
    public Iterable<feedback> getAllFeedback() { return feedbackRepository.findAll(); }

    @GetMapping("/getall/{username}")
    public List<feedback> getAllFeedbackByUser(@PathVariable(name="username") String username) {
        user user = userClient.getUserByName(username);
        return feedbackRepository.findAllByUserid(user);
    }

    @GetMapping("/getall/feed/{roomid}")
    public List<feedback> getAllFeedbackByRoom(@PathVariable(name="roomid") Integer roomid) {
        Optional<room> room = roomClient.getRoomById(roomid);
        if(room.isEmpty()) { return null; }
        return feedbackRepository.findAllByRoomid(room.get());
    }

    @GetMapping("/getaver/mark/{roomid}")
    public Double getAllAverMarkByRoom(@PathVariable(name="roomid") Integer roomid) {
        Optional<room> room = roomClient.getRoomById(roomid);
        if(room.isEmpty()) { return null; }
        List<feedback> feedbackDoc = feedbackRepository.findAllByRoomid(room.get());
        Double aver = 0.0;
        for (feedback feed : feedbackDoc) {
            aver += feed.getMark();
        }
        if(aver == 0) { return -1.0; }
        else { return aver / feedbackDoc.size(); }
    }

    @GetMapping("/getby/{id}")
    public Optional<feedback> getFeedbackById(@PathVariable(name="id") int id) { return feedbackRepository.findById(id); }

    @PostMapping("/new/{username}/{bookingid}/{mark}")
    public feedback createFeedback(@PathVariable(name="username") String username,
                                   @PathVariable(name="bookingid") Integer bookingid,
                                   @PathVariable(name="mark") Integer mark,
                                   @RequestBody String body) {
        feedback feedback = new feedback();
        user user = userClient.getUserByName(username);
        room room = bookingClient.getBookingById(bookingid).get().getRoomid();
        feedback.setUserid(user);
        feedback.setRoomid(room);
        feedback.setBody(body);
        feedback.setMark(mark);
        feedback.setTime(new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(Calendar.getInstance().getTime()));
        feedback f = feedbackRepository.save(feedback);
        roomClient.getCountaver(room.getRoomid());
        return f;
    }

    @DeleteMapping("/del/{id}")
    public void deleteFeedback(@PathVariable(name="id") int id) {
        feedbackRepository.deleteById(id);
    }
}