package com.appdynamics.moviedbservice.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Loyalty.
 */
@Entity
@Table(name = "loyalty")
public class Loyalty implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type")
    private String type;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public Loyalty type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Loyalty)) {
            return false;
        }
        return id != null && id.equals(((Loyalty) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Loyalty{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            "}";
    }
}
