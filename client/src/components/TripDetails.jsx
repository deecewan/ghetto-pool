import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Comment, Header, Image, Icon } from 'semantic-ui-react';
import TimeAgo from 'react-timeago';
import { filter } from 'lodash';

export default class TripDetails extends Component {
  renderPassengerInformation() {
    if (!this.props.open) {
      return null
    }

    const passengerLength = Object.keys(this.props.passengers).length
    if (passengerLength < 1) {
      return null
    }

    return (
      <Card.Content extra>
        <div style={{ margin: "0 -1rem -0.75rem" }}>
          {this.props.passengers.map((p, i) => this.renderPassengerCard(p, i === passengerLength - 1))}
        </div>
      </Card.Content>
    )
  }

  renderPassengerIcon(passenger) {
    if (passenger.accepted) {
      return <Icon name="check" color="green" />;
    }

    if (this.props.inPast) {
      return <Icon name="remove" color="red" />;
    }

    return null;
  }

  renderPassengerCard(passenger, bottomRadius) {
    const backgroundColor = passenger.accepted
      ? "#e8f8ec"
      : this.props.inPast
        ? "#fbe9e9"
        : "";

    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "3rem",
          padding: "0 2rem",
          backgroundColor,
          borderBottomRightRadius: bottomRadius ? "4px" : null,
          borderBottomLeftRadius: bottomRadius ? "4px" : null,
        }}
        key={passenger.id}
      >
        <div style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          paddingRight: "1rem",
        }}>
          <Image
            src={passenger.photo}
            shape="rounded"
            size="mini"
          />
        </div>
        <div style={{
          display: "flex",
          flexGrow: 1,
          alignItems: "center",
        }}>
          {`${passenger.firstName} ${passenger.lastName}`}
        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
        }}>
          {this.renderPassengerIcon(passenger)}
        </div>
      </div>
    )
  }

  getTripDetails() {
    const tripOwnerImager = this.props.invitedBy
      ? <Image floated='right' shape="rounded" size='mini' src={this.props.invitedBy.photo} />
      : null;

    const tripOwnerName = this.props.type === 'journey'
      ? `${this.props.invitedBy.firstName}'s Trip`
      : 'Your Trip';

    const numPassengers = Object.keys(this.props.passengers).length;

    return (
      <div style={{
        width: "100%",
        marginBottom: "1rem",
      }}>
        <Card fluid link={numPassengers > 0}>
          <Card.Content>
            {tripOwnerImager}
            <Card.Header>
              {tripOwnerName}
            </Card.Header>
            <Card.Meta>
              <span>{`${this.props.inPast ? 'Left for' : 'Leaving for'} ${this.props.destination}${this.props.inPast ? '' : ' in'}`}</span>
              <TimeAgo date={this.props.departAt} />
            </Card.Meta>
            <Card.Meta>
              <div>
                <strong style={{ marginRight: "0" }}>{filter(this.props.passengers, 'accepted').length}</strong> passengers out of <strong>{numPassengers}</strong> have accepted.
              </div>
            </Card.Meta>
          </Card.Content>
          {this.renderPassengerInformation()}
        </Card>
      </div>
    )
  }

  render() {
    return (
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
        onClick={e => {
          e.target.value = this.props.id;
          this.props.onClick(e);
        }}
      >
        {this.getTripDetails()}
      </div>
    )
  }
}
