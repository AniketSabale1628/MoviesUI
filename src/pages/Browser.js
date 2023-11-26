import React, { useState, useEffect } from 'react';
import axios from 'axios';
import circlImage from '../assets/image18.png'
import './Browser.css'
import { useNavigate } from 'react-router-dom';


const NextPage = () => {
  const [moviesByCategory, setMoviesByCategory] = useState({});
  const selectedCategories = JSON.parse(localStorage.getItem('selectedCategories')) || [];

  useEffect(() => {
    const apiKey = 'b39fae28754f0a221a142410e8071a31';

    const fetchMovies = async (category) => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
          params: {
            api_key: apiKey,
            query: category,
          },
        });

        console.log(`Movies for ${category}:`, response.data.results);
        return response.data.results;
      } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
      }
    };

    const fetchAllMovies = async () => {
      const moviesData = await Promise.all(selectedCategories.map(category => fetchMovies(category)));
      const moviesByCategory = selectedCategories.reduce((acc, category, index) => {
        acc[category] = moviesData[index];
        return acc;
      }, {});
      setMoviesByCategory(moviesByCategory);
    };

    fetchAllMovies();
  }, [selectedCategories]);
  const Navigate=useNavigate();
  return (
    <div className="category-container">
     
        <img src={circlImage} className='musc' onClick={()=>{
           Navigate('/Page2')
        }}></img>
    
      <h1 className='spl'>Super app</h1>
      <p className="pargraph">Entertainment according to your choice</p>
      {selectedCategories.map(category => (
        <div key={category} className="category">
          <h2 className="category-name">{category}</h2>
          <div className="movies-posters">
            {moviesByCategory[category] && moviesByCategory[category].slice(0, 4).map(movie => (
              <div key={movie.id} className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt={movie.title} className='Poster'/>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NextPage;