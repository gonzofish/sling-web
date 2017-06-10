// @flow
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

type Props = {
    component: any,
    exactly?: boolean,
    isAuthenticated: boolean,
    pattern: string,
    willAuthenticate: boolean
}

const render = (props, isAuthenticated, willAuthenticate, Component) => {
    let rendered = null;

    if (isAuthenticated) {
        rendered = <Redirect to={ { pathname: '/' }} />;
    } else if (!willAuthenticate) {
        rendered = <Component { ...props} />;
    }

    return rendered;
};

const RedirectAuthenticated = ({
    component: Component,
    exactly,
    isAuthenticated,
    pattern,
    willAuthenticate
}: Props) =>
    <Route exactly={ exactly }
        pattern={ pattern }
        render={ (props) =>
            render(props, isAuthenticated, willAuthenticate, Component)
        }
    />;

export default RedirectAuthenticated;
