package com.appdynamics.moviedbservice.service.impl;

import com.appdynamics.moviedbservice.service.LoyaltyService;
import com.appdynamics.moviedbservice.domain.Loyalty;
import com.appdynamics.moviedbservice.repository.LoyaltyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Loyalty}.
 */
@Service
@Transactional
public class LoyaltyServiceImpl implements LoyaltyService {

    private final Logger log = LoggerFactory.getLogger(LoyaltyServiceImpl.class);

    private final LoyaltyRepository loyaltyRepository;

    public LoyaltyServiceImpl(LoyaltyRepository loyaltyRepository) {
        this.loyaltyRepository = loyaltyRepository;
    }

    /**
     * Save a loyalty.
     *
     * @param loyalty the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Loyalty save(Loyalty loyalty) {
        log.debug("Request to save Loyalty : {}", loyalty);
        return loyaltyRepository.save(loyalty);
    }

    /**
     * Get all the loyalties.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Loyalty> findAll() {
        log.debug("Request to get all Loyalties");
        return loyaltyRepository.findAll();
    }

    /**
     * Get one loyalty by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Loyalty> findOne(Long id) {
        log.debug("Request to get Loyalty : {}", id);
        return loyaltyRepository.findById(id);
    }

    /**
     * Delete the loyalty by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Loyalty : {}", id);
        loyaltyRepository.deleteById(id);
    }
}
