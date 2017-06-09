// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
    link: {
        color: '#555459',
        fontSize: '22px',
        fontWeight: 'bold',
        ':hover': { textDecoration: 'none' },
        ':focus': { textDecoration: 'none' }
    },
    navbar: {
        alignItems: 'center',
        background: '#fff',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        height: '70px',
        padding: '0 1rem'
    }
});

const Navbar = () =>
    <nav className={ css(styles.navbar) }>
        <Link to="/" className={ css(styles.link) }>Sling</Link>
    </nav>;

export default Navbar;
