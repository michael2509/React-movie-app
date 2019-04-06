import React, { Component } from "react";
import "./Movie.css";
import LoadingMovie from "./loading-movie/LoadingMovie";

class Movie extends Component {
    state = {
        isLoading: true,
        movie: {}
    }

    componentDidMount() {
        const { movieId } = this.props.match.params;
        const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=0e220568bac27a347c49f800f789f519&language=fr-FR`;

        fetch(movieUrl)
            .then(response => response.json())
            .then(data => this.setState({ movie: data, isLoading: false }))
            .catch( error => console.log("Error:", error));
    }

    render() {
        const {
            title,
            backdrop_path,
            release_date,
            genres,
            overview,
            vote_average,
            runtime
        } = this.state.movie;

        const releaseYear = release_date ? release_date.substring(0, 4) : null;
        const imgUrl = `http://image.tmdb.org/t/p/w1280/${backdrop_path}`;

        const backgroundStyle = {
            backgroundImage: `url(${imgUrl})`
        }
        
        return (
            <div>
        {this.state.isLoading
          ? <LoadingMovie />
          : <div className="movie-page">
              <div className="movie-image" style={backgroundStyle} />
              <div className="movie-details">
                <h1>
                  {title}
                  <span>({releaseYear})</span>
                </h1>
                <section className="genres">
                  {genres.map((genre, index) => (
                    <div key={genre.id}>
                      <span>{genre.name}</span>
                      {index < genres.length - 1 && (
                        <span className="separator">|</span>
                      )}
                    </div>
                  ))}
                </section>
                <h5>
                  Rating:
                  <span>{vote_average}</span>
                </h5>
                <h5>
                  Runtime:
                  <span>{`${runtime} min`}</span>
                </h5>
                <h4>Overview</h4>
                <p>{overview}</p>
              </div>
            </div>
        }
      </div>
        )
    }
}

export default Movie;