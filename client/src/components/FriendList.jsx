import React from 'react';
import { Card, Button, Message, Image } from 'semantic-ui-react';

const Friend = ({ friend, onClick }) => (
  <Card>
    <Card.Content>
      <Image floated='right' size='mini' src={friend.photo} />
      <Card.Header>{friend.firstName} {friend.lastName}</Card.Header>
    </Card.Content>
    <Card.Content extra>
      <Button style={{ width: '100%' }} basic={!friend.invited} color='green' onClick={() => onClick(friend.id)} icon={friend.invited ? "check" : null} content="Invite" />
    </Card.Content>
  </Card>
)

export default function FriendList({ friends, onFriendClick }) {
  if (friends.length === 0) {
    return <p>No friends available to take this trip...</p>
  }
  return (
    <div style={{ marginBottom: 60 }}>
      {friends.map(friend => <Friend key={friend.id} onClick={onFriendClick} friend={friend} />)}
    </div>
  );
}
