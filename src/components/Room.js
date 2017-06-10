// @flow
import React from 'react';

const Room = (props: Object) =>
    <div>Room: { props.match.params.id }</div>;

export default Room;
