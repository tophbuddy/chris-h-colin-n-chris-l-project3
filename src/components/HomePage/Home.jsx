import React from 'react';
import './Home.css';

export default function Home() {

    return (
        <div>
            <h1 className='homeTitle'>Movie Review App</h1>
            <h2 className='homeTitle'>{"By Chris Holzheu, Colin Nordquist, Christopher Lee"}</h2>
            <br></br>
            <p>
                List of movies display here
            </p>
            <br></br>
        </div>
    );
}