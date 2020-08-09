import React from 'react';
import './AnimeBanner.scss';

class AnimeBanner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <img src={this.props.pic} width={window.innerWidth}></img>
            </div>
        );
    }

}

export default AnimeBanner;