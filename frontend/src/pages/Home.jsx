import MovieCard from '../components/MovieCard'
import React from 'react'
import { useState } from 'react'
import '../css/Home.css'
import { useEffect } from 'react'
import {searchMovies, getPopularMovies} from '../services/api'


function Home() {

    const [searchQuery, setSearchQuery] = useState('');
    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovie(popularMovies);
            } catch (error) {
                console.error('Error fetching popular movies:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        loadPopularMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            alert('Please enter a search query');
            return;
        }

        if (loading) {
            return; // Prevent multiple searches while loading
        }

        // Perform search logic here
            setLoading(true);
            try {
                const searchResults = await searchMovies(searchQuery);
                setMovie(searchResults);
            } catch (error) {
                console.error('Error fetching search results:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
    }

  return (
    <div className="home">
        <form onSubmit ={handleSearch} className="search-form">
            <input type="text" 
                   placeholder="Search for a movie..."  
                   className="search-input" 
                   value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            <button type="submit" className="search-button">Search</button>
        </form>

        {error && <div className="error-message">Error: {error}</div>}

        {loading ? (<div className="loading">Loading...</div>) : (
            <div className="movie-grid">
                {movie.map(movie => (
                    <MovieCard movie={movie} key={movie.id}/>
                ))}
            </div>
        )}

    </div>
  );
}

export default Home;