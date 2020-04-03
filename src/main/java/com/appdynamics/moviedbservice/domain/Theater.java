package com.appdynamics.moviedbservice.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Theater.
 */
@Entity
@Table(name = "theater")
public class Theater implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    @OneToMany(mappedBy = "theater")
    private Set<Showtime> showtimes = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "theater_movie",
               joinColumns = @JoinColumn(name = "theater_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "movie_id", referencedColumnName = "id"))
    private Set<Movie> movies = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Theater name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public Theater address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public byte[] getImage() {
        return image;
    }

    public Theater image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public Theater imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public Set<Showtime> getShowtimes() {
        return showtimes;
    }

    public Theater showtimes(Set<Showtime> showtimes) {
        this.showtimes = showtimes;
        return this;
    }

    public Theater addShowtime(Showtime showtime) {
        this.showtimes.add(showtime);
        showtime.setTheater(this);
        return this;
    }

    public Theater removeShowtime(Showtime showtime) {
        this.showtimes.remove(showtime);
        showtime.setTheater(null);
        return this;
    }

    public void setShowtimes(Set<Showtime> showtimes) {
        this.showtimes = showtimes;
    }

    public Set<Movie> getMovies() {
        return movies;
    }

    public Theater movies(Set<Movie> movies) {
        this.movies = movies;
        return this;
    }

    public Theater addMovie(Movie movie) {
        this.movies.add(movie);
        movie.getTheaters().add(this);
        return this;
    }

    public Theater removeMovie(Movie movie) {
        this.movies.remove(movie);
        movie.getTheaters().remove(this);
        return this;
    }

    public void setMovies(Set<Movie> movies) {
        this.movies = movies;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Theater)) {
            return false;
        }
        return id != null && id.equals(((Theater) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Theater{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", address='" + getAddress() + "'" +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            "}";
    }
}
