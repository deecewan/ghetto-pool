import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Comment, Header, Image, Icon } from 'semantic-ui-react';
import moment from 'moment';

export default class TripDetails extends Component {
  constructor(props) {
    super(props);

    this.getTripDetails = this.getTripDetails.bind(this);
    this.printHostName = this.printHostName.bind(this);

    this.onClick = e => {
      e.target.value = props.id;
      props.onClick(e);
    }

    this.inPast = Date.now() > this.props.departAt
  }

  getTrips() {
    return (
      <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Button style={{ marginTop: 3, marginBottom: 3 }}>{this.props.destination}</Button>
      </div>
    )
  }

  printHostName() {
    return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          {this.props.hostedBy}
        </div>
    )
  }

  renderPassengerIcon(passenger) {
    if (passenger.accepted) {
      return <Icon name="check" color="green" />;
    }

    if (this.inPast) {
      return <Icon name="remove" color="red" />;
    }

    return null;
  }

  renderPassengerCard(passenger) {
    const backgroundColor = passenger.accepted
      ? "#e8f8ec"
      : this.inPast
        ? "#fbe9e9"
        : "";

    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "2.5rem",
          backgroundColor,
        }}
        key={passenger.id}
      >
        <div style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
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
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >
        Leaving at: {moment(this.props.departAt).format('H:mm')}  <br></br>
        Hosted by: {this.props.type === 'journey' ? this.printHostName() : "you"}
        <br></br>Transport: {this.props.transportMethod} <br></br>
        {this.props.passengers.map(p => this.renderPassengerCard(p))}
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
        onClick={this.onClick}
      >
        {this.getTrips()}
        {this.props.open ? this.getTripDetails() : null}
      </div>
    )
  }
}
