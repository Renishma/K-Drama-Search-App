import React from 'react';
import '../App.css';

const MovieDetails = ({ selected, close }) => {
    // Format date to show only year
    const releaseYear = selected.first_air_date 
        ? new Date(selected.first_air_date).getFullYear() 
        : 'Unknown year';

    // Format rating with stars
    const renderRating = () => {
        if (!selected.vote_average) return 'No rating available';
        const stars = '⭐'.repeat(Math.round(selected.vote_average / 2));
        return `${stars} (${selected.vote_average}/10)`;
    };

    // Format genres if available
    const renderGenres = () => {
        if (!selected.genres || selected.genres.length === 0) {
            return 'Genre information not available';
        }
        return selected.genres.map(genre => genre.name).join(', ');
    };

    return (
        <div className='d-flex flex-column justify-content-center text-white kdrama-details-container'>
            <div className="text-center mb-4">
                <button 
                    onClick={close} 
                    className='btn btn-danger back-button'
                >
                    &larr; Back to Results
                </button>
                <h2 className="kdrama-title">{selected.name}</h2>
                <h5 className="text-muted">{releaseYear} • {renderGenres()}</h5>
            </div>

            <div className='container mt-3'>
                <div className='row'>
                    <div className='col-12 col-md-5 text-center mb-4 mb-md-0'>
                        <img 
                            src={
                                selected.poster_path 
                                    ? selected.poster_path 
                                    : 'https://via.placeholder.com/300x450?text=No+Poster+Available'
                            } 
                            alt={`Poster for ${selected.name}`}
                            className="img-fluid rounded kdrama-poster shadow-lg"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/300x450?text=Poster+Not+Available';
                            }}
                        />
                    </div>
                    
                    <div className='col-12 col-md-7 kdrama-info'>
                        <div className="mb-4">
                            <h4 className="section-title">Overview</h4>
                            <p className="overview-text">
                                {selected.overview || 'No overview available.'}
                            </p>
                        </div>

                        <div className="row details-grid">
                            <div className="col-6">
                                <h4 className="section-title">Rating</h4>
                                <p>{renderRating()}</p>
                            </div>
                            <div className="col-6">
                                <h4 className="section-title">Status</h4>
                                <p>{selected.status || 'Unknown'}</p>
                            </div>
                            <div className="col-6">
                                <h4 className="section-title">Seasons</h4>
                                <p>{selected.number_of_seasons || 'Unknown'}</p>
                            </div>
                            <div className="col-6">
                                <h4 className="section-title">Episodes</h4>
                                <p>{selected.number_of_episodes || 'Unknown'}</p>
                            </div>
                            <div className="col-6">
                                <h4 className="section-title">Network</h4>
                                <p>
                                    {selected.networks && selected.networks.length > 0 
                                        ? selected.networks[0].name 
                                        : 'Unknown network'}
                                </p>
                            </div>
                            <div className="col-6">
                                <h4 className="section-title">Language</h4>
                                <p>{selected.original_language === 'ko' ? 'Korean' : selected.original_language}</p>
                            </div>
                        </div>

                        {selected.homepage && (
                            <div className="mt-4">
                                <a 
                                    href={selected.homepage} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="btn btn-primary official-site-btn"
                                >
                                    Visit Official Site
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;