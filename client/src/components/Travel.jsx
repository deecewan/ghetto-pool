import React, { Component } from 'react';
import { Button, Input, Dropdown } from 'semantic-ui-react';

const timeOptions = [{ text: '15 minutes', value: 15 }, { text: '30 minutes', value: 30 }, { text: '1 hour', value: 60 }]

export class Travel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      destination: '',
      time: 0,
      transport: 'car',
    };

    this.updateDestination = this.updateDestination.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.updateTransport = this.updateTransport.bind(this);
  }

  updateDestination(e) {
    this.setState({ destination: e.target.value });
  }

  updateTime(e, data) {
    this.setState({ time: data.value });
  }

  updateTransport(value) {
    this.setState({ transport: value });
  }

  getSubmitButton() {
    if (!this.state.destination || !this.state.time) {
      return null;
    }

    return <Button>Submit</Button>;
  }

  render() {
    return (
      <div>
        <Input
          icon='location arrow'
          iconPosition='left'
          placeholder='Destination'
          value={this.state.destination}
          onChange={this.updateDestination}
        />
        <Dropdown placeholder='When are you leaving?' fluid selection options={timeOptions} onChange={this.updateTime} />
        <Button.Group>
          <Button color={this.state.transport === 'car' ? 'blue' : null} icon="car" onClick={() => this.updateTransport('car')} value={10}/>
          <Button color={this.state.transport === 'bus' ? 'blue' : null} icon="bus" onClick={() => this.updateTransport('bus')} />
          <Button color={this.state.transport === 'plane' ? 'blue' : null} icon="military" onClick={() => this.updateTransport('plane')} />
          <Button color={this.state.transport === 'ship' ? 'blue' : null} icon="ship" onClick={() => this.updateTransport('ship')} />
          <Button color={this.state.transport === 'walk' ? 'blue' : null} icon="blind" onClick={() => this.updateTransport('walk')} />
        </Button.Group>
        {this.getSubmitButton()}
      </div>
    );
  }
}

export default Travel;
