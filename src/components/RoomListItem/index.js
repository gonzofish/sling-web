// @flow
import React from 'react';

type Props = {
  currentUserRoomIds: Array<number>,
  onRoomJoin: (number) => void,
  room: {
    id: number,
    name: string
  }
};

const RoomListItem = ({ currentUserRoomIds, onRoomJoin, room }: Props) => {
  const isJoined = currentUserRoomIds.includes(room.id);

  return (
    <div key={ room.id } style={ { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
      <span style={ { marginRight: '8px' } }>{ room.name }</span>
      <button className="btn btn-sm"
        disabled={ isJoined }
        onClick={ () => onRoomJoin(room.id) }>
        { isJoined ? 'Joined' : 'Join' }
      </button>
    </div>
  );
};

export default RoomListItem;