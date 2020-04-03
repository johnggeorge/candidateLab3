package com.appdynamics.moviedbservice.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Customer.
 */
@Entity
@Table(name = "customer")
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @OneToMany(mappedBy = "user")
    private Set<Booking> bookings = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("customers")
    private Loyalty loyalty;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Customer name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public Customer email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public Customer password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Booking> getBookings() {
        return bookings;
    }

    public Customer bookings(Set<Booking> bookings) {
        this.bookings = bookings;
        return this;
    }

    public Customer addBooking(Booking booking) {
        this.bookings.add(booking);
        booking.setUser(this);
        return this;
    }

    public Customer removeBooking(Booking booking) {
        this.bookings.remove(booking);
        booking.setUser(null);
        return this;
    }

    public void setBookings(Set<Booking> bookings) {
        this.bookings = bookings;
    }

    public Loyalty getLoyalty() {
        return loyalty;
    }

    public Customer loyalty(Loyalty loyalty) {
        this.loyalty = loyalty;
        return this;
    }

    public void setLoyalty(Loyalty loyalty) {
        this.loyalty = loyalty;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Customer)) {
            return false;
        }
        return id != null && id.equals(((Customer) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Customer{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", email='" + getEmail() + "'" +
            ", password='" + getPassword() + "'" +
            "}";
    }
}
