package com.appdynamics.moviedbservice.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.appdynamics.moviedbservice.web.rest.TestUtil;

public class LoyaltyTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Loyalty.class);
        Loyalty loyalty1 = new Loyalty();
        loyalty1.setId(1L);
        Loyalty loyalty2 = new Loyalty();
        loyalty2.setId(loyalty1.getId());
        assertThat(loyalty1).isEqualTo(loyalty2);
        loyalty2.setId(2L);
        assertThat(loyalty1).isNotEqualTo(loyalty2);
        loyalty1.setId(null);
        assertThat(loyalty1).isNotEqualTo(loyalty2);
    }
}
