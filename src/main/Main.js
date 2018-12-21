import React, { Component } from "react";
import "./Main.css";
import Navigation from "./navigation/Navigation";
import Movies from "./movies/Movies";

class Main extends Component {
    state = {
        movies: [],
        page: 1,
        total_pages: 1,
        url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr-FR`,
        moviesUrl: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`,
        genre: "Action",
        genres: [],
        year: {
            label: "year",
            min: 1990,
            max: 2018,
            step: 1,
            value: { min: 1995, max: 2018 }
        },
        rating: {
            label: "rating",
            min: 0,
            max: 10,
            step: 1,
            value: { min: 8, max: 10 }
        },
        runtime: {
            label: "runtime",
            min: 0,
            max: 300,
            step: 15,
            value: { min: 90, max: 180 }
        }
    }

    saveStateToLocalStorage = () => {
        localStorage.setItem("movie-finder.params", JSON.stringify(this.state));
    }

    getStateFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem("movie-finder.params"));
    }

    onGenreChange = event => {
        this.setState({ genre: event.target.value });
    }

    onChange = data => {
        this.setState({
            [data.type]: {
                ...this.state[data.type], // previous value of this.state.year
                value: data.value // overwrite only the value property
            }
        })
    }

    setGenres = genres => {
        this.setState({ genres });
    }

    generateUrl = params => {
        const { genres, year, rating, runtime, page } = params;
        const selectedGenre = genres.find( genre => genre.name === params.genre);
        const genreId = selectedGenre.id;

        const moviesUrl = `https://api.themoviedb.org/3/discover/movie?` +
        `api_key=${process.env.REACT_APP_TMDB_API_KEY}&` +
        `language=fr-FR&sort_by=popularity.desc&` +
        `with_genres=${genreId}&` +
        `primary_release_date.gte=${year.value.min}-01-01&` +
        `primary_release_date.lte=${year.value.max}-12-31&` +
        `vote_average.gte=${rating.value.min}&` +
        `vote_average.lte=${rating.value.max}&` +
        `with_runtime.gte=${runtime.value.min}&` +
        `with_runtime.lte=${runtime.value.max}&` +
        `page=${page}`;

        this.setState({ moviesUrl });
    }

    onSearchButtonClick = () => {
        this.setState({ page: 1 });
        this.generateUrl(this.state);
    }

    fetchMovies = (url) => {
        fetch(url)
            .then(response => response.json())
            .then(data => this.storeMovies(data))
            .catch(error => console.log(error))
    }

    storeMovies = data => {
        const movies = data.results.map( result => {
            const  { vote_count, id, genre_ids, poster_path, title, vote_average, release_date } = result;
        return { vote_count, id, genre_ids, poster_path, title, vote_average, release_date };
        });

        this.setState({ movies, total_pages: data.total_pages });
    }

    onPageIncrease = () => {
        const { page, total_pages } = this.state;
        const nextPage = page + 1;
        if(nextPage <= total_pages) {
            this.setState({ page: nextPage })
        }
    }

    onPageDecrease = () => {
        const nextPage = this.state.page -1;
        if( nextPage > 0 ) {
            this.setState({ page: nextPage });
        } 
    }

    componentDidMount() {
        const savedState = this.getStateFromLocalStorage();

        if(!savedState || (savedState && !savedState.movies.length)) {
            this.fetchMovies(this.state.moviesUrl);
        } else {
            this.setState({ ...savedState });
            this.generateUrl(savedState);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        this.saveStateToLocalStorage();

        if(this.state.moviesUrl !== prevState.moviesUrl) {
            this.fetchMovies(this.state.moviesUrl);
        }

        if(this.state.page !== prevState.page) {
            this.generateUrl(this.state);
        }
    }

    render() {
        return(
            <section className="main">
                <Navigation 
                    onChange={this.onChange}
                    onGenreChange={this.onGenreChange}
                    setGenres={this.setGenres}
                    onSearchButtonClick={this.onSearchButtonClick}
                    {...this.state}
                />
                <Movies 
                    movies={this.state.movies}
                    page={this.state.page}
                    onPageIncrease={this.onPageIncrease}
                    onPageDecrease={this.onPageDecrease}    
                />
            </section>
        )
    }
}

export default Main;