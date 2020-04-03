package com.appdynamics.moviedbservice.web.rest;

import com.appdynamics.moviedbservice.domain.Loyalty;
import com.appdynamics.moviedbservice.service.LoyaltyService;
import com.appdynamics.moviedbservice.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.appdynamics.moviedbservice.domain.Loyalty}.
 */
@RestController
@RequestMapping("/api")
public class LoyaltyResource {

    private final Logger log = LoggerFactory.getLogger(LoyaltyResource.class);

    private static final String ENTITY_NAME = "loyalty";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LoyaltyService loyaltyService;

    public LoyaltyResource(LoyaltyService loyaltyService) {
        this.loyaltyService = loyaltyService;
    }

    /**
     * {@code POST  /loyalties} : Create a new loyalty.
     *
     * @param loyalty the loyalty to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new loyalty, or with status {@code 400 (Bad Request)} if the loyalty has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/loyalties")
    public ResponseEntity<Loyalty> createLoyalty(@RequestBody Loyalty loyalty) throws URISyntaxException {
        log.debug("REST request to save Loyalty : {}", loyalty);
        if (loyalty.getId() != null) {
            throw new BadRequestAlertException("A new loyalty cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Loyalty result = loyaltyService.save(loyalty);
        return ResponseEntity.created(new URI("/api/loyalties/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /loyalties} : Updates an existing loyalty.
     *
     * @param loyalty the loyalty to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated loyalty,
     * or with status {@code 400 (Bad Request)} if the loyalty is not valid,
     * or with status {@code 500 (Internal Server Error)} if the loyalty couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/loyalties")
    public ResponseEntity<Loyalty> updateLoyalty(@RequestBody Loyalty loyalty) throws URISyntaxException {
        log.debug("REST request to update Loyalty : {}", loyalty);
        if (loyalty.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Loyalty result = loyaltyService.save(loyalty);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, loyalty.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /loyalties} : get all the loyalties.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of loyalties in body.
     */
    @GetMapping("/loyalties")
    public List<Loyalty> getAllLoyalties() {
        log.debug("REST request to get all Loyalties");
        return loyaltyService.findAll();
    }

    /**
     * {@code GET  /loyalties/:id} : get the "id" loyalty.
     *
     * @param id the id of the loyalty to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the loyalty, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/loyalties/{id}")
    public ResponseEntity<Loyalty> getLoyalty(@PathVariable Long id) {
        log.debug("REST request to get Loyalty : {}", id);
        Optional<Loyalty> loyalty = loyaltyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(loyalty);
    }

    /**
     * {@code DELETE  /loyalties/:id} : delete the "id" loyalty.
     *
     * @param id the id of the loyalty to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/loyalties/{id}")
    public ResponseEntity<Void> deleteLoyalty(@PathVariable Long id) {
        log.debug("REST request to delete Loyalty : {}", id);
        loyaltyService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
