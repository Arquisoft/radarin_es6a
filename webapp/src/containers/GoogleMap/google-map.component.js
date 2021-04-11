import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';



export class GoogleMap extends Component  {
  state = { userLocation: { lat: 32, lng: 32 }, loading: true };

  componentDidMount(props) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        this.setState({
          userLocation: { lat: latitude, lng: longitude },
          loading: false
        });
      },
      () => {
        this.setState({ loading: false });
      }
    );
  }

  render() {
    const { loading, userLocation } = this.state;
    const { google } = this.props;

    if (loading) {
      return null;
    }

    return (
      <Map google={google} initialCenter={userLocation} zoom={15} style={{ height: '70%' }} >
        <Marker
          id={1}
          title={'La posición del usuario.'}
          name={'User'}
          position={{lat: userLocation.lat, lng: userLocation.lng}} />
      </Map>
      );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCq7IZfjMkcJz_LpKORLnNxG6_5M-d5Ztw')
})(GoogleMap)