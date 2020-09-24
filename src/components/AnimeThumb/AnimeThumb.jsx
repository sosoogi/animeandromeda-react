import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../Contexts/UserContext';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { Link } from 'react-router-dom';
import Figure from 'react-bootstrap/Figure';
import Badge from 'react-bootstrap/Badge';
import { HeartFill } from 'react-bootstrap-icons';
import globals from '../../globals/variables';
import cookie from 'js-cookie';
import './AnimeThumb.scss';

const AnimeThumb = (props) => {
    const [loved, setLoved] = useState(false);
    const [userData, setUserData] = useContext(UserContext);

    const toggleLoved = ($loved) => {
        let subscription = new BehaviorSubject({});

        if (!loved) {
            subscription = fromFetch(`${globals.AUTH_API_URL}/user/loved`, {
                method: 'POST',
                headers: {
                    'x-auth-token': cookie.get('auth-token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    loved: $loved
                })
            })
                .pipe(
                    switchMap(res => res.json())
                )
                .subscribe(
                    () => {
                        if (userData !== 'expired token') {
                            setLoved(true);
                            const prevState = { ...userData };
                            const nextState = { loved: prevState.loved.concat($loved) };
                            setUserData({ ...prevState, ...nextState });
                        } else {
                            window.location.href = '/login'
                        }
                    },
                );
        } else {
            deleteLoved($loved)
        }
        return () => subscription.unsubscribe();
    }

    const deleteLoved = ($loved) => {
        let subscription = new BehaviorSubject({});

        subscription = fromFetch(`${globals.AUTH_API_URL}/user/loved`, {
            method: 'DELETE',
            headers: {
                'x-auth-token': cookie.get('auth-token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                loved: $loved
            })
        })
            .pipe(
                switchMap(res => res.json())
            )
            .subscribe(() => {
                setLoved(false);
                const prevState = { ...userData };
                const nextState = {
                    loved: prevState.loved.filter(el => {
                        return el.series !== $loved.series
                    })
                };
                setUserData({ ...prevState, ...nextState });
            });

        return () => subscription.unsubscribe();
    }

    useEffect(() => {
        const loved = userData?.loved;
        const test = loved?.filter(x => x?.series === props.series);
        if (test?.length > 0) {
            setLoved(true)
        }
    }, [props.series, userData]);

    return (
        <div className='flyer-container'>
            <Figure>
                <Link to={'/anime/details/' + props.series}>
                    <Figure.Image
                        width={props.xsize || (window.innerWidth < globals.MOBILE_MAX_WIDTH ? window.innerWidth : 200)}
                        height={props.ysize || 300}
                        src={props.pic || globals.INCONSISTENT_API_IMG}
                        className='flyer'
                        alt=''
                    />
                </Link>
                {props.ep ? <Badge variant='danger' className='badge-ep'>{props.ep}</Badge> : null}
                {props.loved ?
                    <Badge
                        variant={loved ? 'danger' : 'secondary'}
                        className={props.small ? 'badge-love' : 'badge-ep'}
                        onClick={() => toggleLoved({
                            series: props.series,
                            title: props.title,
                            pic: props.pic,
                            premiere: props.premiere,
                        })}>
                        <HeartFill color='white' />
                    </Badge>
                    : null}
                {props.premiere ? <Badge variant='primary' className='badge-premiere'>{props.premiere.split(' ')[1] || null}</Badge> : null}
                <Link to={'/anime/details/' + props.series}>
                    <div className='caption'>{props.title || '-'}</div>
                </Link>
            </Figure>
        </div>
    );
}

export default AnimeThumb;
