import React from 'react';

class MapWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null
        };
        this.getLocation = this.getLocation.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);
    }
    
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoordinates);
        } else {
            console.log("This browser doesn't support geolocating");
        }
    }

    getCoordinates(position) {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.latitude && this.state.longitude ?
                    <iframe src={`https://www.google.com/maps/embed/v1/search?key==mental+health+services&center=${this.state.latitude},${this.state.longitude}`}
                        width="700" height="550" style={{border:0}} allowfullscreen="" loading="lazy"></iframe>
                    :
                    <iframe src={`https://www.google.com/maps/embed/v1/search?key==mental+health+services`}
                        width="700" height="550" style={{border:0}} allowfullscreen="" loading="lazy"></iframe>
                }
            </div>
        )
    }
}

export default MapWindow;
