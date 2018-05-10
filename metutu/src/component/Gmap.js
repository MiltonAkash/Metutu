import React,{Component} from 'react'

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {ChatItem} from "react-chat-elements";
import {Link} from "react-router-dom";

export class MapContainer extends Component {
    constructor(props){
        super(props);
        console.log("USER FROM MAP",props.user);
    }
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    render() {
        return (
            <div>
            <Map google={this.props.google}
                 initialCenter={{
                lat: this.props.tutors[0].location.latitude,
                lng: this.props.tutors[0].location.longitude
            }}
                 zoom={18}
                 onClick={this.onMapClicked}>

                {this.props.tutors.map(tutor =>
                    <Marker
                        onClick={this.onMarkerClick}

                        position={{lat:tutor.location.latitude,lng:tutor.location.longitude}}

                            {...tutor} />
                )}

                {/*<Marker onClick={this.onMarkerClick}*/}
                        {/*name={'Current location'} />*/}

                {/*<Marker onClick={this.onMarkerClick}*/}
                        {/*position={{lat: 37.762391, lng: -122.439192}}*/}
                        {/*url='https://lh6.googleusercontent.com/-khwM1WEhtbs/AAAAAAAAAAI/AAAAAAAAHgE/FrmLJY2np7U/photo.jpg'*/}
                        {/*name={'Akash Milton'} />*/}

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div onClick={()=>{console.log('mapchatcliked');this.props.goToChat(this.state.selectedPlace.uid)}} >
                        {/*<h1>{this.state.selectedPlace.name}</h1>*/}
                        {/*<img src={this.state.selectedPlace.url}/>*/}
                        <ChatItem
                            onClick={(x)=>{
                                console.log("sfd",x);}}
                            avatar={this.state.selectedPlace.photoURL}
                            alt={'Reactjs'}
                            title={this.state.selectedPlace.displayName}
                            // date={new Date()}
                            unread={0} />
                    </div>
                </InfoWindow>
            </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey:'AIzaSyD2CYHdwEbcQG73bqtDqa3i9MPR_0kDnBc'
})(MapContainer)