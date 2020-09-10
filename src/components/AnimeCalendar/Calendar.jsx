import React from 'react';
import Table from 'react-bootstrap/Table';
import './Calendar.scss';

const Calendar = () => {
    return (
        <div>
            <div className='mt-3'></div>
            <div className='container home-anime-container p-3 shadow rounded'>
                <div className='row'>
                    <div className='col'>
                        <div>In costruzione :)</div>
                        <Table responsive borderless className='anime-calendar'>
                            <thead>
                                <tr>
                                    <th>Lunedì</th>
                                    <th>Martedì</th>
                                    <th>Mercoledì</th>
                                    <th>Giovedì</th>
                                    <th>Venerdì</th>
                                    <th>Sabato</th>
                                    <th>Domenica</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>test</td>
                                    <td>test</td>
                                    <td>test</td>
                                    <td>test</td>
                                    <td>test</td>
                                    <td>test</td>
                                    <td>test</td>
                                </tr>
                                <tr>
                                    <td>test</td>
                                    <td>test</td>
                                    <td>test</td>
                                    <td>test</td>
                                    <td>test</td>
                                    <td>test</td>
                                    <td>test</td>
                                </tr>
                                <tr>
                                    <td>test</td>
                                    <td>test</td>
                                    <td>test</td>
                                    <td>test</td>
                                    <td>test</td>
                                    <td>test</td>
                                    <td>test</td>
                                </tr>
                                <tr>
                                    <td>test</td>
                                    <td>test</td>
                                    <td>test</td>
                                    <td>test</td>
                                    <td>test</td>
                                    <td>test</td>
                                    <td>test</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calendar;