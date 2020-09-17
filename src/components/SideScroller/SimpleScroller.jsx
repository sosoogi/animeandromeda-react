import React, { useState } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import AnimeThumb from '../AnimeThumb/AnimeThumb';
import globals from '../../globals/variables';
import Hammer from 'hammerjs';
import './SimpleScroller.scss';

const MenuItem = ({ text, selected, title, pic, key }) => {
    return (
        <div className={`menu-item ${selected ? 'active' : ''}`}>
            <AnimeThumb
                series={text}
                pic={pic}
                title={title || text}
                xsize={166}
                ysize={264}
                key={key}>
            </AnimeThumb>
        </div>
    );
};

const containerRef = React.createRef();

const onUpdate = () => {
    let hammer = Hammer(containerRef.current);
    let wheeleventLeft = new WheelEvent("wheel", { deltaX: -600 });
    let wheeleventRight = new WheelEvent("wheel", { deltaX: -600 });
    hammer.on("swiperight", () => window.dispatchEvent(wheeleventRight));
    hammer.on("swipeleft", () => window.dispatchEvent(wheeleventLeft));
}

const Menu = (list, selected) => {
    return list.map(el => {
        const { series, pic, title, _id } = el;
        return <MenuItem text={series} key={_id.series} pic={pic} title={title} selected={selected} />;
    });
}

const AnimeScroller = (props) => {
    const [selected, onSelect] = useState(0);
    const data = Menu(props.data);
    return (
        <div className='container p-0' ref={containerRef}>
            <ScrollMenu
                data={data}
                selected={selected}
                onSelect={(key) => onSelect(key)}
                onUpdate={() => onUpdate()}
                wheel={false}
                dragging={true}
                transition={0.2}
                translate={window.innerWidth <= globals.MOBILE_MAX_WIDTH ? 0 : 10}
            />
        </div>
    );
}

export default AnimeScroller;