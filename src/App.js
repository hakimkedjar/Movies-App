import { useState, useEffect } from "react";

import './App.css';
import MovieCard from "./MovieCard";
import searchIcon from './search.svg';


const API_URL = "http://www.omdbapi.com?apikey=a6d26e03";

const App = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies("Asterix");
    }, []);

    return (
        <div className="app">
                <h1>Movies</h1>

                <div className="search">
                    <input
                        placeholder="Search movie"
                        value={searchTerm}
                        onChange = {(e) => setSearchTerm(e.target.value)}
                    />
                    <img
                        src={searchIcon}
                        alt='search'
                        onClick={() => searchMovies(searchTerm)}
                    />
                </div>

                {movies?.length > 0 
                    ? (
                        <div className="container">
                            { movies.map((movie, i) => (
                                <MovieCard movie={movie} key={i}/>
                            ))}
                        </div>
                    ) : (
                        <div className="empty">
                            <h2>No movies Found</h2>
                        </div>
                    )
                }


        </div>
    );
}

export default App;