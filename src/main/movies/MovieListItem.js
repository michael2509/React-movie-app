import React from "react";
import "./MovieListItem.css";

const MovieListItem = ({ movie }) => {
    const { title, poster_path, release_date, vote_average } = movie;
    const imgUrl = `https://image.tmdb.org/t/p/w342/${poster_path}`;
    const year = release_date.substring(0, 4);

    return (
        <li class="movie-item">
            <img src={imgUrl} alt={title} />
            <div class="movie-description">
                <h2>{title}</h2>
                <section class="movie-details">
                    <div class="movie-year">
                        <span class="title">Year</span>
                        <span>{year}</span>
                    </div>
                    <div class="movie-rating">
                        <span class="title">Rating</span>
                        <span>{vote_average}</span>
                    </div>
                </section>
            </div>
        </li>
    )
}

export default MovieListItem;