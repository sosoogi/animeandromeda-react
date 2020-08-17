import React from 'react';
import './Pagination.scss';

export class Pagination extends React.Component {
    render() {
        const { episodesPerPage, totalEpisodes, paginate, nextPage, prevPage, currentPage } = this.props;
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(totalEpisodes / episodesPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <nav>
                <ul className='pagination justify-content-center d-flex flex-wrap pagica'>
                    <li className='page-item'>
                        <button className='page-link' onClick={() => prevPage()}>Indietro</button>
                    </li>
                    {pageNumbers.map((x, idx) => (
                        <li className={x === currentPage ? 'page-item active' : 'page-item'} key={idx}>
                            <button onClick={() => paginate(x)} className='page-link'>{x}</button>
                        </li>
                    ))}
                    <li className='page-item'>
                        <button className='page-link' onClick={() => nextPage()}>Avanti</button>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Pagination