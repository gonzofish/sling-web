// @flow
import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    active: {
        ':after': {
            background: 'rgba(255, 0, 0, 1)',
            borderBottomRightRadius: '3px',
            borderTopRightRadius: '3px',
            bottom: '12px',
            content: '""',
            left: '0',
            position: 'absolute',
            top: '12px',
            width: '3px'
        },
        color: '#fff'
    },
    badge: {
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '5px',
        display: 'flex',
        fontSize: '20px',
        height: '45px',
        justifyContent: 'center',
        margin: '12px auto',
        width: '45px'
    },
    link: {
        ':focus': {
            color: 'rgba(255, 255, 255, 1)'
        },
        ':hover': {
            color: 'rgba(255, 255, 255, 1)'
        },
        color: 'rgba(255, 255, 255, 0.6)',
        display: 'flex',
        position: 'relative',
        textDecoration: 'none',
        width: '65px'
    },
    logout: {
        background: 'transparent',
        border: '0',
        cursor: 'pointer',
        padding: '0'
    },
    sidebar: {
        background: 'rgb(38, 28, 37)',
        display: 'flex',
        flexDirection: 'column'
    }
});

type Room = {
    id: number,
    name: string
};
type RoomLinkProps = {
    room: Room
};
type SidebarProps = {
    history: Object,
    onLogoutClick: (Object) => void,
    rooms: Array<any>
};

const RoomLink = ({ room }: RoomLinkProps) =>
    <NavLink activeClassName={ css(styles.active) } className={ css(styles.link) } to={`/r/${ room.id }`}>
        <div className={ css(styles.badge) }>
            { room.name.charAt(0) }
        </div>
    </NavLink>;

const Sidebar = ({ history, onLogoutClick, rooms }: SidebarProps) =>
    <div className={ css(styles.sidebar) }>
        { rooms.map((room) => <RoomLink key={ room.id } room={ room } />) }
        <NavLink activeClassName={ css(styles.active) }
            className={ css(styles.link) }
            exact
            to="/">
            <div  className={ css(styles.badge) }>
                <span className="fa fa-plus"></span>
            </div>
        </NavLink>

        <div style={ { flex: '1' } }></div>

        <button className={ css(styles.link, styles.logout) } onClick={ () => onLogoutClick({ history }) }>
            <div className={ css(styles.badge) }>
                <span className="fa fa-sign-out"></span>
            </div>
        </button>
    </div>;

export default withRouter(Sidebar);
