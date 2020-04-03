package com.appdynamics.moviedbservice.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Booking.
 */
@Entity
@Table(name = "booking")
public class Booking implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "no_of_seats")
    private Integer noOfSeats;

    @ManyToOne
    @JsonIgnoreProperties("bookings")
    private Customer user;

    @ManyToOne
    @JsonIgnoreProperties("bookings")
    private Showtime showtime;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNoOfSeats() {
        return noOfSeats;
    }

    public Booking noOfSeats(Integer noOfSeats) {
        this.noOfSeats = noOfSeats;
        return this;
    }

    public void setNoOfSeats(Integer noOfSeats) {
        this.noOfSeats = noOfSeats;
    }

    public Customer getUser() {
        return user;
    }

    public Booking user(Customer customer) {
        this.user = customer;
        return this;
    }

    public void setUser(Customer customer) {
        this.user = customer;
    }

    public Showtime getShowtime() {
        return showtime;
    }

    public Booking showtime(Showtime showtime) {
        this.showtime = showtime;
        return this;
    }

    public void setShowtime(Showtime showtime) {
        this.showtime = showtime;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Booking)) {
            return false;
        }
        return id != null && id.equals(((Booking) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Booking{" +
            "id=" + getId() +
            ", noOfSeats=" + getNoOfSeats() +
            "}";
    }
}
