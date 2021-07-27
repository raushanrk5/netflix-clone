import React, { useEffect, useState } from 'react';
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';


const base_url = "https://image.tmdb.org/t/p/original"; 

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies,setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    
    // A snippet of code which runs based on a given condition
     useEffect(() => {
        //if [], run once when the row loads, and don't run again
        async function fetchData(){
            const request = await axios.get(fetchUrl)
            const req = fetch("https://cricapi.com/api/cricketScore?apikey=BOu972kfi8cCoNLAx7KSXpWzoJH2&unique_id=1034809")
            .then((response) => response.json())
            .then((response) => {
                console.log(req);
            });
            
            setMovies(request.data.results);
            return request;
        }
        fetchData()
     }, [fetchUrl]);

     const opts = {
         height: "390",
         width: "100%",
         playerVars: {
             autoplay: 1,
         },
     };

     const handleClick = (movie) => {
         if(trailerUrl) {
             setTrailerUrl("");
         }
         else{
             movieTrailer(movie?.name || "")
             .then((url) => {
                    //https://www.youtube.com/watch?v=GRcmApC5AFY
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
             })
                .catch((error) => console.log(error));
       }
     }

    return (
        <div className="row">
              {/* title */}
              <h2>{title}</h2>
              <div className="row__posters">
                {movies.map(movie => (
                    <img 
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`${base_url}${
                                isLargeRow ? movie.poster_path : movie.backdrop_path
                            }`} 
                        alt={movie.name} />
                ))}
              </div>
              {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
