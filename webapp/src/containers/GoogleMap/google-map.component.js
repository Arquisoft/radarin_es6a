import React, { Component } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
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
        googleMapHelper.getFriendsPosition(this.webId, this.state.userLocation.lat, this.state.userLocation.lng, this.handleFriendsFunc);
      },
      () => {
        this.setState({ loading: false });
      }
    );
  }

  async handleFriends(json) {
    this.setState({ friends: json.friends });
    this.setState({ friend: json.number >= 0 });
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
        <div>
          <div style={{ marginLeft: 50, marginTop: 20, marginBottom: 20, alignItems: "center", alignContent: "center" }}>
            <p style={{ textAlign: "center", fontSize: 18 }}>{'Amigos cerca: ' + this.state.friends.length}</p>
          </div>
          <div>
            <Map google={google} initialCenter={userLocation} zoom={15} style={{ marginBottom: 50, marginRight: 50, marginLeft: 50, height: '70%' }} >
              <Marker
                id={1}
                title={'La posición del usuario.'}
                name={'User'}
                position={{ lat: userLocation.lat, lng: userLocation.lng }}>
              </Marker>
              {this.state.friends.map((friend, i) => {
                return (
                  <Marker
                    id={friend.username + "-" + friend.idp}
                    title={'Posición de ' + friend.username}
                    name={friend.username}
                    icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}
                    position={{
                      lat: friend.latitud,
                      lng: friend.longitud
                    }}
                  >
                  </Marker>
                );
              })}
            </Map>
          </div>
        </div >
      );
    }
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCq7IZfjMkcJz_LpKORLnNxG6_5M-d5Ztw')
})(GoogleMap)