package com.appdynamics.moviedbservice.repository;

import com.appdynamics.moviedbservice.domain.Showtime;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Showtime entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {
}
