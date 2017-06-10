// @flow
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

type Props = {
    component: any,
    exact?: boolean,
    isAuthenticated: boolean,
    path: string,
    willAuthenticate: boolean
}

const render = (props, isAuthenticated, willAuthenticate, Component) => {
    let rendered = null;

    if (isAuthenticated) {
        rendered = <Component { ...props} />;
    } else if (!willAuthenticate) {
        rendered = <Redirect to={ { pathname: '/login' }} />;
    }

    return rendered;
};

const RouteAuthenticated = ({
    component: Component,
    exact,
    isAuthenticated,
    path,
    willAuthenticate
}: Props) =>
    <Route exact={ exact }
        path={ path }
        render={ (props) =>
            render(props, isAuthenticated, willAuthenticate, Component)
        }
    />;

export default RouteAuthenticated;