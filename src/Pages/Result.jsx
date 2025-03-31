import React, { useState } from 'react';
import '../App.css';

function Result({ result, openDetails }) {
    const [imgError, setImgError] = useState(false);
    const year = result.first_air_date?.substring(0,4) || 'Year unknown';

    return (
        <div className="result-card" onClick={() => openDetails(result.id)}>
            <div className="poster-container">
                <img
                    src={imgError ? 'https://via.placeholder.com/300x450/2a2a2a/ffffff?text=Poster+Not+Available' : result.poster_path}
                    alt={`${result.name} poster`}
                    onError={() => setImgError(true)}
                    className={`poster-image ${imgError ? 'placeholder' : ''}`}
                />
            </div>
            <div className="info-container">
                <h3 className="title">{result.name}</h3>
                <p className="year">{year}</p>
                {result.vote_average && (
                    <div className="rating">
                        Rating: {result.vote_average.toFixed(1)}/10
                    </div>
                )}
            </div>
        </div>
    );
}

export default Result;