import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Loader, Image } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";
import { addLocations } from "../store/locations/actions";
import { filter } from "lodash";

const CustomMarker = ({ firstName, photo }) => {
  return (
    <div style={{width: "35px", height: "35px"}}>
      <Image
        bordered
        src={photo}
        size="mini"
        shape="circular"
      />
    </div>
  )
};

class TripMap extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, defaultCenter: null };
  }

  componentWillMount() {
    axios.get('/locations', {params: {fb_user_ids: this.props.fbUserIds.join(',')}})
      .then(({ data: { locations }}) => this.props.dispatch(addLocations(locations)))
      .then(() => this.setState({ loading: false }))
  }

  renderContent() {
    const userLocations = this.props.fbUserIds.map(id => ({ id: id, ...this.props.users[id], ...this.props.locations[id] }));
    const centerLocation = userLocations.find(l => l.id === this.props.centerId);

    if (this.state.loading || !centerLocation.lat || !centerLocation.lng) {
      return <Loader active inverted inline size="large">Loading...</Loader>;
    }

    return (
      <GoogleMapReact
        apiKey="AIzaSyBqPdx_xX3jLl1KzAp2JqFZDps77sEhhxw"
        defaultCenter={centerLocation}
        defaultZoom={15}
      >
        {filter(userLocations, ul => ul.lat && ul.lng).map(({id, photo, firstName, lat, lng}) => (
          <CustomMarker
            key={id}
            lat={lat}
            lng={lng}
            firstName={firstName}
            photo={photo}
          />
        ))}
      </GoogleMapReact>
    );
  }

  render() {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
      }}>
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    locations: state.locations,
    users: state.users,
  }
);

export default connect(mapStateToProps)(TripMap)
