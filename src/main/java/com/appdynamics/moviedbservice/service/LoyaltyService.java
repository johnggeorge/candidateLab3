package com.appdynamics.moviedbservice.service;

import com.appdynamics.moviedbservice.domain.Loyalty;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Loyalty}.
 */
public interface LoyaltyService {

    /**
     * Save a loyalty.
     *
     * @param loyalty the entity to save.
     * @return the persisted entity.
     */
    Loyalty save(Loyalty loyalty);

    /**
     * Get all the loyalties.
     *
     * @return the list of entities.
     */
    List<Loyalty> findAll();

    /**
     * Get the "id" loyalty.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Loyalty> findOne(Long id);

    /**
     * Delete the "id" loyalty.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
