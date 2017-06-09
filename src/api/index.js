const API = process.env.REACT_APP_API_URL;

const headers = () => {
    const token = JSON.parse(localStorage.getItem('token'));

    return {
        Accept: 'application/json',
        Authorization: `Bearer ${ token }`,
        'Content-Type': 'application/json'
    };
};

const parseResponse = (response) =>
    response.json().then((json) => {
        if (!response.ok) {
            return Promise.reject(json);
        }

        return json;
    });

const queryString = (params) => {
    const query = Object.keys(params)
        .map((key) => encodeParam(key, params[key]))
        .join('&');

    return `${ query.length ? '?' : ''}${ query }`;
};

const encodeParam = (key, value) =>
    `${ encodeURIComponent(key) }=${ encodeURIComponent(value) }`;

export default {
    delete(url) {
        return fetch(`${ API }${ url }`, {
            headers: headers(),
            method: 'DELETE'
        }).then(parseResponse);
    },
    fetch(url, params = {}) {
        return fetch(`${ API }${ url }${ queryString(params) }`, {
            headers: headers(),
            method: 'GET'
        }).then(parseResponse);
    },
    patch(url, data) {
        return fetch(`${ API }${ url }`, {
            body: JSON.stringify(data),
            headers: headers(),
            method: 'PATCH'
        }).then(parseResponse);
    },
    post(url, data) {
        return fetch(`${ API }${ url }`, {
            body: JSON.stringify(data),
            headers: headers(),
            method: 'POST'
        }).then(parseResponse);
    }
}