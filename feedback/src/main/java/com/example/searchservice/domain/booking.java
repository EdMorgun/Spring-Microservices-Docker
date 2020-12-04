package com.example.searchservice.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;

@Getter
@Setter
@Entity
@Table(name = "booking")
public class booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="bookingid", updatable = false, nullable = false)
    private Integer bookingid;

    @ManyToOne
    @JoinColumn(name = "userid", nullable = false)
    private user userid;

    @ManyToOne
    @JoinColumn(name = "roomid", nullable = false)
    private room roomid;

    @Column(name = "checkindate", nullable = false)
    private Date checkInDate;

    @Column(name = "evictiondate", nullable = false)
    private Date evictionDate;

    public booking() {}
}
