import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import MovieDetails from './MovieDetails';
import Result from './Result';
import Search from './Search';

function HomePage() {
    const [state, setState] = useState({
        search: "",
        results: [],
        selected: {},
        isLoading: false
    });

    const API_KEY = '306fb3d77de0c6095d9c1963090c8840';
    const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';

    useEffect(() => {
        setState(prev => ({...prev, isLoading: true}));
        axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_origin_country=KR&with_genres=18&language=en-US`)
            .then(res => {
                const resultsWithFullImgPath = res.data.results.map(item => ({
                    ...item,
                    poster_path: item.poster_path ? `${BASE_IMG_URL}${item.poster_path}` : null
                }));
                
                setState(prevState => ({
                    ...prevState, 
                    results: resultsWithFullImgPath,
                    isLoading: false
                }));
            })
            .catch(err => {
                console.log(err);
                setState(prev => ({...prev, isLoading: false}));
            });
    }, []);

    const handleInput = (event) => {
        let search = event.target.value;
        setState(prevState => ({
            ...prevState, 
            search: search
        }));
    }

    const openDetails = (id) => {
        setState(prev => ({...prev, isLoading: true}));
        axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`)
            .then(({ data }) => {
                const selectedWithFullImgPath = {
                    ...data,
                    poster_path: data.poster_path ? `${BASE_IMG_URL}${data.poster_path}` : null,
                    backdrop_path: data.backdrop_path ? `${BASE_IMG_URL}${data.backdrop_path}` : null
                };
                
                setState(prevState => ({
                    ...prevState, 
                    selected: selectedWithFullImgPath,
                    isLoading: false
                }));
            })
            .catch(err => {
                console.log(err);
                setState(prev => ({...prev, isLoading: false}));
            });
    }

    const SearchResult = (event) => {
        if (event.key === 'Enter' && state.search.trim()) {
            setState(prev => ({...prev, isLoading: true}));
            axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${state.search}&language=en-US&with_origin_country=KR`)
                .then(res => {
                    const resultsWithFullImgPath = res.data.results.map(item => ({
                        ...item,
                        poster_path: item.poster_path ? `${BASE_IMG_URL}${item.poster_path}` : null
                    }));
                    
                    setState(prevState => ({
                        ...prevState, 
                        results: resultsWithFullImgPath,
                        isLoading: false
                    }));
                })
                .catch(err => {
                    console.log(err);
                    setState(prev => ({...prev, isLoading: false}));
                });
        }
    }

    const close = () => {
        setState(prevState => ({
            ...prevState, 
            selected: {}
        }));
    }

    return (
        <div className="main-wrapper">
            {state.isLoading && (
                <div className="loading-overlay">
                    <div className="spinner-border text-danger" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {typeof state.selected.name !== "undefined" ? (
                <MovieDetails selected={state.selected} close={close} />
            ) : (
                <div className="content-wrapper">
                    <header className="header">
                        <h1 className="app-title">K-Drama Search</h1>
                        <Search handleInput={handleInput} SearchResult={SearchResult} />
                    </header>
                    
                    {state.results.filter(result => result.poster_path).length === 0 && !state.isLoading ? (
                        <div className="empty-state">
                            <h3>No K-Dramas found</h3>
                            <p>Try searching for popular titles</p>
                        </div>
                    ) : (
                        <div className="results-container">
                            <h2 className="section-title">
                                {state.search ? 'Search Results' : 'Popular K-Dramas'}
                            </h2>
                            <div className="results-grid">
                                {state.results.map((result, i) => (
                                    result.poster_path && (
                                        <Result key={i} result={result} openDetails={openDetails} />
                                    )
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default HomePage;