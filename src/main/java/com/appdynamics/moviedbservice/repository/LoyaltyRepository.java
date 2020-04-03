package com.appdynamics.moviedbservice.repository;

import com.appdynamics.moviedbservice.domain.Loyalty;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Loyalty entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LoyaltyRepository extends JpaRepository<Loyalty, Long> {
}
