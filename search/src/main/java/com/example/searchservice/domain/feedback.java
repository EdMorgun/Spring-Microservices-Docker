package com.example.searchservice.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "feedback")
public class feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="feedback_id", updatable = false, nullable = false)
    private Integer feedback_id;

    @Column(name ="body")
    private String body;

    @ManyToOne
    @JoinColumn(name = "userid", nullable = false)
    private user userid;

    @ManyToOne
    @JoinColumn(name = "roomid", nullable = false)
    private room roomid;

    @Column(name ="time", nullable = false)
    private String time;

    @Column(name ="mark", nullable = false)
    private Integer mark;

    public feedback() {}
}
