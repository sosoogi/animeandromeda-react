import React, { useState, useEffect } from 'react';
import { Observable } from 'rxjs'
import { switchMap, delay, takeUntil } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import globals from '../../globals/variables';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import AnimeThumb from '../AnimeThumb/AnimeThumb';
import Hammer from 'hammerjs';
import './SimpleScroller.scss';

const MenuItem = ({ text, title, pic, key, premiere }) => {
    return (
        <div className='menu-item'>
            <AnimeThumb
                series={text}
                pic={pic}
                title={title || text}
                xsize={176}
                ysize={264}
                premiere={premiere}
                loved={true}
                small={true}
                key={key}>
            </AnimeThumb>
        </div>
    );
};

const containerRef = React.createRef();

const onUpdate = () => {
    const hammer = Hammer(containerRef.current);
    const wheeleventLeft = new WheelEvent("wheel", { deltaX: -500 });
    const wheeleventRight = new WheelEvent("wheel", { deltaX: -500 });
    hammer.on("swiperight", () => window.dispatchEvent(wheeleventRight));
    hammer.on("swipeleft", () => window.dispatchEvent(wheeleventLeft));
}

const Menu = (list) => {
    return list.map(el => {
        const { series, pic, title, _id, premiere } = el;
        return <MenuItem text={series} key={_id.series} pic={pic} title={title} premiere={premiere} />;
    });
}


const AnimeScroller = (props) => {
    const [more, setMore] = useState(false);
    const [stop, setStop] = useState(false);
    const [data, setData] = useState(...props.data);

    useEffect(() => {
        setData(Menu(props.data));

    }, [props.data])

    useEffect(() => {
        if (data?.length > 50) {
            setStop(true)
            return;
        }
        if (more) {
            let $random = new Observable();
            $random = fromFetch(`${globals.API_URL}anime/random?size=2`)
                .pipe(
                    switchMap(res => res.json()),
                    takeUntil($random),
                    delay(125)
                )
                .subscribe($data => {
                    setData((Array.prototype.concat(data, Menu($data))
                        .filter((val, idx, arr) => arr.findIndex(curr => (curr.key === val.key)) === idx)))
                    setMore(false)
                })
            return () => $random.unsubscribe();
        }
    }, [more, data]);


    return (
        <div className='container container-fluid p-0' ref={containerRef}>
            <ScrollMenu
                data={data}
                onUpdate={() => onUpdate()}
                wheel={!more}
                selected={0}
                scrollBy={16}
                inertiaScrolling={true}
                inertiaScrollingSlowdown={0.85}
                dragging={!more}
                onLastItemVisible={stop ? () => { return; } : () => setMore(true)}
            />
        </div>
    );
}

export default AnimeScroller;