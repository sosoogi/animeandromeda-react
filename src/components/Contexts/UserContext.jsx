import React, { useState, useEffect, createContext } from 'react';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import globals from '../../globals/variables';
import cookie from 'js-cookie';

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        let subscription = new BehaviorSubject([]);
        subscription = fromFetch(`${globals.AUTH_API_URL}/user`, {
            headers: {
                'x-auth-token': cookie.get('auth-token'),
            },
        })
            .pipe(
                switchMap(res => res.json())
            )
            .subscribe($data => setUserData($data));
        return () => subscription.unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={[userData, setUserData]}>
            {props.children}
        </UserContext.Provider>
    );
}