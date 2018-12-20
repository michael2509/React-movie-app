import React, { Component } from "react";

import "./Navigation.css";
import Selection from "./selection/Selection";
import Slider from "./slider/Slider";

class Navigation extends Component {

    componentDidMount() {
        const genresURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr-FR`;
        
        fetch(genresURL)
            .then(response => response.json())
            .then(data => this.props.setGenres( data.genres ))
            .catch(error => console.log(error));
    }

    render() {
        const { genre, genres, onGenreChange, onChange, year, rating, runtime } = this.props;

        return (
            <section className="navigation">
                <Selection
                genre={genre}
                genres={genres}
                onGenreChange={onGenreChange}
                />

                <Slider data={year} onChange={onChange} />
                <Slider data={rating} onChange={onChange} />
                <Slider data={runtime} onChange={onChange} />
            </section>
        )
    }
}

export default Navigation;