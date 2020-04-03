package com.appdynamics.moviedbservice.web.rest;

import com.appdynamics.moviedbservice.MovieDbServiceApp;
import com.appdynamics.moviedbservice.domain.Loyalty;
import com.appdynamics.moviedbservice.repository.LoyaltyRepository;
import com.appdynamics.moviedbservice.service.LoyaltyService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link LoyaltyResource} REST controller.
 */
@SpringBootTest(classes = MovieDbServiceApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class LoyaltyResourceIT {

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    @Autowired
    private LoyaltyRepository loyaltyRepository;

    @Autowired
    private LoyaltyService loyaltyService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLoyaltyMockMvc;

    private Loyalty loyalty;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Loyalty createEntity(EntityManager em) {
        Loyalty loyalty = new Loyalty()
            .type(DEFAULT_TYPE);
        return loyalty;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Loyalty createUpdatedEntity(EntityManager em) {
        Loyalty loyalty = new Loyalty()
            .type(UPDATED_TYPE);
        return loyalty;
    }

    @BeforeEach
    public void initTest() {
        loyalty = createEntity(em);
    }

    @Test
    @Transactional
    public void createLoyalty() throws Exception {
        int databaseSizeBeforeCreate = loyaltyRepository.findAll().size();

        // Create the Loyalty
        restLoyaltyMockMvc.perform(post("/api/loyalties")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(loyalty)))
            .andExpect(status().isCreated());

        // Validate the Loyalty in the database
        List<Loyalty> loyaltyList = loyaltyRepository.findAll();
        assertThat(loyaltyList).hasSize(databaseSizeBeforeCreate + 1);
        Loyalty testLoyalty = loyaltyList.get(loyaltyList.size() - 1);
        assertThat(testLoyalty.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createLoyaltyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = loyaltyRepository.findAll().size();

        // Create the Loyalty with an existing ID
        loyalty.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLoyaltyMockMvc.perform(post("/api/loyalties")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(loyalty)))
            .andExpect(status().isBadRequest());

        // Validate the Loyalty in the database
        List<Loyalty> loyaltyList = loyaltyRepository.findAll();
        assertThat(loyaltyList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllLoyalties() throws Exception {
        // Initialize the database
        loyaltyRepository.saveAndFlush(loyalty);

        // Get all the loyaltyList
        restLoyaltyMockMvc.perform(get("/api/loyalties?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(loyalty.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)));
    }
    
    @Test
    @Transactional
    public void getLoyalty() throws Exception {
        // Initialize the database
        loyaltyRepository.saveAndFlush(loyalty);

        // Get the loyalty
        restLoyaltyMockMvc.perform(get("/api/loyalties/{id}", loyalty.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(loyalty.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE));
    }

    @Test
    @Transactional
    public void getNonExistingLoyalty() throws Exception {
        // Get the loyalty
        restLoyaltyMockMvc.perform(get("/api/loyalties/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLoyalty() throws Exception {
        // Initialize the database
        loyaltyService.save(loyalty);

        int databaseSizeBeforeUpdate = loyaltyRepository.findAll().size();

        // Update the loyalty
        Loyalty updatedLoyalty = loyaltyRepository.findById(loyalty.getId()).get();
        // Disconnect from session so that the updates on updatedLoyalty are not directly saved in db
        em.detach(updatedLoyalty);
        updatedLoyalty
            .type(UPDATED_TYPE);

        restLoyaltyMockMvc.perform(put("/api/loyalties")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedLoyalty)))
            .andExpect(status().isOk());

        // Validate the Loyalty in the database
        List<Loyalty> loyaltyList = loyaltyRepository.findAll();
        assertThat(loyaltyList).hasSize(databaseSizeBeforeUpdate);
        Loyalty testLoyalty = loyaltyList.get(loyaltyList.size() - 1);
        assertThat(testLoyalty.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingLoyalty() throws Exception {
        int databaseSizeBeforeUpdate = loyaltyRepository.findAll().size();

        // Create the Loyalty

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLoyaltyMockMvc.perform(put("/api/loyalties")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(loyalty)))
            .andExpect(status().isBadRequest());

        // Validate the Loyalty in the database
        List<Loyalty> loyaltyList = loyaltyRepository.findAll();
        assertThat(loyaltyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLoyalty() throws Exception {
        // Initialize the database
        loyaltyService.save(loyalty);

        int databaseSizeBeforeDelete = loyaltyRepository.findAll().size();

        // Delete the loyalty
        restLoyaltyMockMvc.perform(delete("/api/loyalties/{id}", loyalty.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Loyalty> loyaltyList = loyaltyRepository.findAll();
        assertThat(loyaltyList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
