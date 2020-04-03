package com.appdynamics.moviedbservice.web.rest;

import com.appdynamics.moviedbservice.MovieDbServiceApp;
import com.appdynamics.moviedbservice.domain.Showtime;
import com.appdynamics.moviedbservice.repository.ShowtimeRepository;
import com.appdynamics.moviedbservice.service.ShowtimeService;

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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.appdynamics.moviedbservice.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ShowtimeResource} REST controller.
 */
@SpringBootTest(classes = MovieDbServiceApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ShowtimeResourceIT {

    private static final ZonedDateTime DEFAULT_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Integer DEFAULT_NOOFSEATS = 1;
    private static final Integer UPDATED_NOOFSEATS = 2;

    private static final Float DEFAULT_RATE = 1F;
    private static final Float UPDATED_RATE = 2F;

    @Autowired
    private ShowtimeRepository showtimeRepository;

    @Autowired
    private ShowtimeService showtimeService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restShowtimeMockMvc;

    private Showtime showtime;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Showtime createEntity(EntityManager em) {
        Showtime showtime = new Showtime()
            .time(DEFAULT_TIME)
            .noofseats(DEFAULT_NOOFSEATS)
            .rate(DEFAULT_RATE);
        return showtime;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Showtime createUpdatedEntity(EntityManager em) {
        Showtime showtime = new Showtime()
            .time(UPDATED_TIME)
            .noofseats(UPDATED_NOOFSEATS)
            .rate(UPDATED_RATE);
        return showtime;
    }

    @BeforeEach
    public void initTest() {
        showtime = createEntity(em);
    }

    @Test
    @Transactional
    public void createShowtime() throws Exception {
        int databaseSizeBeforeCreate = showtimeRepository.findAll().size();

        // Create the Showtime
        restShowtimeMockMvc.perform(post("/api/showtimes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(showtime)))
            .andExpect(status().isCreated());

        // Validate the Showtime in the database
        List<Showtime> showtimeList = showtimeRepository.findAll();
        assertThat(showtimeList).hasSize(databaseSizeBeforeCreate + 1);
        Showtime testShowtime = showtimeList.get(showtimeList.size() - 1);
        assertThat(testShowtime.getTime()).isEqualTo(DEFAULT_TIME);
        assertThat(testShowtime.getNoofseats()).isEqualTo(DEFAULT_NOOFSEATS);
        assertThat(testShowtime.getRate()).isEqualTo(DEFAULT_RATE);
    }

    @Test
    @Transactional
    public void createShowtimeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = showtimeRepository.findAll().size();

        // Create the Showtime with an existing ID
        showtime.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restShowtimeMockMvc.perform(post("/api/showtimes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(showtime)))
            .andExpect(status().isBadRequest());

        // Validate the Showtime in the database
        List<Showtime> showtimeList = showtimeRepository.findAll();
        assertThat(showtimeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllShowtimes() throws Exception {
        // Initialize the database
        showtimeRepository.saveAndFlush(showtime);

        // Get all the showtimeList
        restShowtimeMockMvc.perform(get("/api/showtimes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(showtime.getId().intValue())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(sameInstant(DEFAULT_TIME))))
            .andExpect(jsonPath("$.[*].noofseats").value(hasItem(DEFAULT_NOOFSEATS)))
            .andExpect(jsonPath("$.[*].rate").value(hasItem(DEFAULT_RATE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getShowtime() throws Exception {
        // Initialize the database
        showtimeRepository.saveAndFlush(showtime);

        // Get the showtime
        restShowtimeMockMvc.perform(get("/api/showtimes/{id}", showtime.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(showtime.getId().intValue()))
            .andExpect(jsonPath("$.time").value(sameInstant(DEFAULT_TIME)))
            .andExpect(jsonPath("$.noofseats").value(DEFAULT_NOOFSEATS))
            .andExpect(jsonPath("$.rate").value(DEFAULT_RATE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingShowtime() throws Exception {
        // Get the showtime
        restShowtimeMockMvc.perform(get("/api/showtimes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateShowtime() throws Exception {
        // Initialize the database
        showtimeService.save(showtime);

        int databaseSizeBeforeUpdate = showtimeRepository.findAll().size();

        // Update the showtime
        Showtime updatedShowtime = showtimeRepository.findById(showtime.getId()).get();
        // Disconnect from session so that the updates on updatedShowtime are not directly saved in db
        em.detach(updatedShowtime);
        updatedShowtime
            .time(UPDATED_TIME)
            .noofseats(UPDATED_NOOFSEATS)
            .rate(UPDATED_RATE);

        restShowtimeMockMvc.perform(put("/api/showtimes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedShowtime)))
            .andExpect(status().isOk());

        // Validate the Showtime in the database
        List<Showtime> showtimeList = showtimeRepository.findAll();
        assertThat(showtimeList).hasSize(databaseSizeBeforeUpdate);
        Showtime testShowtime = showtimeList.get(showtimeList.size() - 1);
        assertThat(testShowtime.getTime()).isEqualTo(UPDATED_TIME);
        assertThat(testShowtime.getNoofseats()).isEqualTo(UPDATED_NOOFSEATS);
        assertThat(testShowtime.getRate()).isEqualTo(UPDATED_RATE);
    }

    @Test
    @Transactional
    public void updateNonExistingShowtime() throws Exception {
        int databaseSizeBeforeUpdate = showtimeRepository.findAll().size();

        // Create the Showtime

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restShowtimeMockMvc.perform(put("/api/showtimes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(showtime)))
            .andExpect(status().isBadRequest());

        // Validate the Showtime in the database
        List<Showtime> showtimeList = showtimeRepository.findAll();
        assertThat(showtimeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteShowtime() throws Exception {
        // Initialize the database
        showtimeService.save(showtime);

        int databaseSizeBeforeDelete = showtimeRepository.findAll().size();

        // Delete the showtime
        restShowtimeMockMvc.perform(delete("/api/showtimes/{id}", showtime.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Showtime> showtimeList = showtimeRepository.findAll();
        assertThat(showtimeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
