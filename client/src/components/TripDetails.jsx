import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Image } from 'semantic-ui-react';
import moment from 'moment';

export class TripDetails extends Component {
  constructor(props) {
    super(props);

    this.getTripDetails = this.getTripDetails.bind(this);
    this.printHostName = this.printHostName.bind(this);
    //this.renderPassengerCard = this.renderPassengerCard.bind(this);
    
    this.onClick = e => {
      e.target.value = props.id;
      props.onClick(e);
    }
  }

  getTrips() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >
        <Button style={{ marginTop: 3, marginBottom: 3 }}>{this.props.id}</Button>
      </div>
    )
  }

  printHostName() {
    return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
          {this.props.hostedBy}
        </div>
    )
  }

  renderPassengerCard(passenger) {
    return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
          {passenger.id}
          {/* {passenger.accepted} */}
          {<Image 
            shape="circular"
            src={passenger.photo}
            size="tiny"
            style={{ marginBottom: 10 }}
          />}
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
        > Trip to: {this.props.destination} <br></br>
          Leaving at: {moment(this.props.departAt).format('H:mm')}  <br></br>
          Hosted by: {this.props.type === 'journey' ? this.printHostName() : "you"}
          <br></br>Transport: {this.props.transportMethod} <br></br>
          {/* Accepted: {this.props.passenger.map(p => p.accepted).join('. ')} */}
          {/* Pending: {this.props.passenger.map(p =>)}} */}
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

export default connect()(TripDetails);