package com.appdynamics.moviedbservice.repository;

import com.appdynamics.moviedbservice.domain.Booking;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Booking entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
}
