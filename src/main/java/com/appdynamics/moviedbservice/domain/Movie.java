package com.appdynamics.moviedbservice.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Movie.
 */
@Entity
@Table(name = "movie")
public class Movie implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "rating")
    private Float rating;

    @Column(name = "genre")
    private String genre;

    @Column(name = "cast")
    private String cast;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    @Column(name = "jhi_desc")
    private String desc;

    @OneToMany(mappedBy = "movie")
    private Set<Showtime> showtimes = new HashSet<>();

    @ManyToMany(mappedBy = "movies")
    @JsonIgnore
    private Set<Theater> theaters = new HashSet<>();

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

    public Movie name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getRating() {
        return rating;
    }

    public Movie rating(Float rating) {
        this.rating = rating;
        return this;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }

    public String getGenre() {
        return genre;
    }

    public Movie genre(String genre) {
        this.genre = genre;
        return this;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getCast() {
        return cast;
    }

    public Movie cast(String cast) {
        this.cast = cast;
        return this;
    }

    public void setCast(String cast) {
        this.cast = cast;
    }

    public byte[] getImage() {
        return image;
    }

    public Movie image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public Movie imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public String getDesc() {
        return desc;
    }

    public Movie desc(String desc) {
        this.desc = desc;
        return this;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Set<Showtime> getShowtimes() {
        return showtimes;
    }

    public Movie showtimes(Set<Showtime> showtimes) {
        this.showtimes = showtimes;
        return this;
    }

    public Movie addShowtime(Showtime showtime) {
        this.showtimes.add(showtime);
        showtime.setMovie(this);
        return this;
    }

    public Movie removeShowtime(Showtime showtime) {
        this.showtimes.remove(showtime);
        showtime.setMovie(null);
        return this;
    }

    public void setShowtimes(Set<Showtime> showtimes) {
        this.showtimes = showtimes;
    }

    public Set<Theater> getTheaters() {
        return theaters;
    }

    public Movie theaters(Set<Theater> theaters) {
        this.theaters = theaters;
        return this;
    }

    public Movie addTheater(Theater theater) {
        this.theaters.add(theater);
        theater.getMovies().add(this);
        return this;
    }

    public Movie removeTheater(Theater theater) {
        this.theaters.remove(theater);
        theater.getMovies().remove(this);
        return this;
    }

    public void setTheaters(Set<Theater> theaters) {
        this.theaters = theaters;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Movie)) {
            return false;
        }
        return id != null && id.equals(((Movie) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Movie{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", rating=" + getRating() +
            ", genre='" + getGenre() + "'" +
            ", cast='" + getCast() + "'" +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            ", desc='" + getDesc() + "'" +
            "}";
    }
}
