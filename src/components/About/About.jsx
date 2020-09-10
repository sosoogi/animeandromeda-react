import React from 'react';
import Logo from '../../assets/Illustration.webp';

const Calendar = () => {
    return (
        <div>
            <div className='mt-3'></div>
            <div className='container home-anime-container p-3 shadow rounded'>
                <div className='row'>
                    <div className='col'>
                        <img alt='animeandromeda-heading' className='img-fluid' src={Logo}></img>
                    </div>
                </div>
                <div className='row'>
                    <div className='col text-left'>
                        <span>AnimeAndromeda è un piccolo progetto.</span>
                        <p> L'obbiettivo era di realizzare un sito di streaming anime
                        veloce e soprattutto senza pubblicità (proprio senza).</p>
                        <p>Il codice è completamente opensource</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calendar;