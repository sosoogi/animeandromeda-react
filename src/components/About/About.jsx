import React from 'react';
import Logo from '../../assets/Illustration.webp';
import Logo_fb from '../../assets/Illustration.png';

const Calendar = () => {
    return (
        <div>
            <div className='mt-3'></div>
            <div className='container home-anime-container p-3 shadow rounded'>
                <div className='row'>
                    <div className='col'>
                        <picture>
                            <source alt='animeandromeda-heading' className='img-fluid' srcSet={Logo} type="image/webp"></source>
                            <img alt='animeandromeda-heading' className='img-fluid' srcSet={Logo_fb}></img>
                        </picture>
                    </div>
                </div>
                <div className='row'>
                    <div className='col text-left'>
                        <span>AnimeAndromeda è un piccolo progetto.</span>
                        <p> L'obbiettivo era di realizzare un sito di streaming anime
                        veloce e soprattutto senza pubblicità.</p>
                        <p>Il codice è completamente opensource</p>
                        <div>
                            <a href="https://github.com/oppaoppai/animeandromeda-react">https://github.com/oppaoppai/animeandromeda-react</a>
                        </div>
                        <div>
                            <a href="https://github.com/oppaoppai/animeandromeda-python">https://github.com/oppaoppai/animeandromeda-python</a>
                        </div>
                        {/* <small>Fantastic Vectorized Padoru by <a href='https://www.deviantart.com/manaalchemist'>ManaAlchemist</a></small> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calendar;