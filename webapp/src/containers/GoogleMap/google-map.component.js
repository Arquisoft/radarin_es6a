import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import googleMapHelper from './googleMapHelper';


type Props = {
  webId: String
};

export class GoogleMap extends Component {

  constructor({ webId }: Props) {
    super();
    this.webId = webId;
    this.state = {
      userLocation: { lat: 32, lng: 32 },
      loading: true,
      friend: false,
      friends: []
    };
    this.handleFriendsFunc = this.handleFriends.bind(this);
  }

  componentDidMount(props) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        this.setState({
          userLocation: { lat: latitude, lng: longitude },
          loading: false
        });
        googleMapHelper.getFriendsPosition(this.webId, 37.4219983, -122.084, this.handleFriendsFunc);
      },
      () => {
        this.setState({ loading: false });
      }
    );
  }

  async handleFriends(json) {
    this.setState({ friends: json.friends });
    this.setState({ friend: json.number > 0 });
  }

  render() {
    const { loading, userLocation } = this.state;
    const { google } = this.props;
    if (loading) {
      return null;
    }
    if (!this.state.friend) {
      return (
        <Map google={google} initialCenter={userLocation} zoom={15} style={{ height: '70%' }} >
          <Marker
            id={1}
            title={'La posición del usuario.'}
            name={'User'}
            position={{ lat: userLocation.lat, lng: userLocation.lng }} />
        </Map>
      );
    } else {
      return (
        <Map google={google} initialCenter={userLocation} zoom={15} style={{ height: '70%' }} >
          <Marker
            id={1}
            title={'La posición del usuario.'}
            name={'User'}
            position={{ lat: userLocation.lat, lng: userLocation.lng }} />
          <Marker
            id={1}
            title={'La posición del usuario.'}
            name={'User'}
            position={{
              lat: this.state.friends[0].latitud,
              lng: this.state.friends[0].longitud
            }} />
        </Map>
      );
    }
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCq7IZfjMkcJz_LpKORLnNxG6_5M-d5Ztw')
})(GoogleMap)