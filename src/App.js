import './App.css';
import React from 'react'
import {getRequest} from "./common/getRequest";
import CustomGoogleMap from "./CustomGoogleMap";

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            stations: [],
            stationsDetails: []
        }
    }

    componentDidMount() {
        getRequest('https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json')
            .then(stationsData => this.setState({stations: stationsData.data.stations}))
            .then(() => getRequest('https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json'))
            .then(stationsDetailsData => this.setState({stationsDetails: stationsDetailsData.data.stations}))
            .catch(error => console.error('could not fetch Data'))
    }

    render() {
        return (
            <div className="App">
                <h1> Bikes App - please click the marker to see details</h1>
                <CustomGoogleMap
                    markers={this.state.stations}
                    stationsDetails={this.state.stationsDetails}
                />
            </div>
        );
    }

}

export default App;
