package com.appdynamics.moviedbservice.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * A Showtime.
 */
@Entity
@Table(name = "showtime")
public class Showtime implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "time")
    private ZonedDateTime time;

    @Column(name = "noofseats")
    private Integer noofseats;

    @Column(name = "rate")
    private Float rate;

    @OneToMany(mappedBy = "showtime")
    private Set<Booking> bookings = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("showtimes")
    private Theater theater;

    @ManyToOne
    @JsonIgnoreProperties("showtimes")
    private Movie movie;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getTime() {
        return time;
    }

    public Showtime time(ZonedDateTime time) {
        this.time = time;
        return this;
    }

    public void setTime(ZonedDateTime time) {
        this.time = time;
    }

    public Integer getNoofseats() {
        return noofseats;
    }

    public Showtime noofseats(Integer noofseats) {
        this.noofseats = noofseats;
        return this;
    }

    public void setNoofseats(Integer noofseats) {
        this.noofseats = noofseats;
    }

    public Float getRate() {
        return rate;
    }

    public Showtime rate(Float rate) {
        this.rate = rate;
        return this;
    }

    public void setRate(Float rate) {
        this.rate = rate;
    }

    public Set<Booking> getBookings() {
        return bookings;
    }

    public Showtime bookings(Set<Booking> bookings) {
        this.bookings = bookings;
        return this;
    }

    public Showtime addBooking(Booking booking) {
        this.bookings.add(booking);
        booking.setShowtime(this);
        return this;
    }

    public Showtime removeBooking(Booking booking) {
        this.bookings.remove(booking);
        booking.setShowtime(null);
        return this;
    }

    public void setBookings(Set<Booking> bookings) {
        this.bookings = bookings;
    }

    public Theater getTheater() {
        return theater;
    }

    public Showtime theater(Theater theater) {
        this.theater = theater;
        return this;
    }

    public void setTheater(Theater theater) {
        this.theater = theater;
    }

    public Movie getMovie() {
        return movie;
    }

    public Showtime movie(Movie movie) {
        this.movie = movie;
        return this;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Showtime)) {
            return false;
        }
        return id != null && id.equals(((Showtime) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Showtime{" +
            "id=" + getId() +
            ", time='" + getTime() + "'" +
            ", noofseats=" + getNoofseats() +
            ", rate=" + getRate() +
            "}";
    }
}
