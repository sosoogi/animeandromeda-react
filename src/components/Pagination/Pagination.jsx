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
                <ul className='pagination justify-content-center d-flex flex-wrap'>
                    <li className='page-item'>
                        <a href={null} className='page-link' onClick={() => prevPage()}>Indietro</a>
                    </li>
                    {pageNumbers.map((x, idx) => (
                        <li className={x === currentPage ? 'page-item active' : 'page-item'} key={idx}>
                            <a href={null} onClick={() => paginate(x)} className='page-link'>{x}</a>
                        </li>
                    ))}
                    <li className='page-item'>
                        <a href={null} className='page-link' onClick={() => nextPage()}>Avanti</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Pagination