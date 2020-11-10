import React from 'react'
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import CustomInfoWindow from "./InfoWindow";

const containerStyle = {
    width: '1000px',
    height: '1000px',
    margin: 'auto'
};

const OsloPosition = {
    lat: 59.9091711, lng: 10.7288386,
};
const zoom = 12

function CustomGoogleMap(props) {
    const [map, setMap] = React.useState(null)
    const [infoWindow, setInfoWindow] = React.useState(null)
    const [infoWindowData, setPositionInfoWindow] = React.useState({
        lat: OsloPosition.lat,
        lng: OsloPosition.lng,
        stationName: '',
        bikesAvailable: 0,
        freeSpots: 0
    })

    const onLoad = React.useCallback(function callback(map) {
        setMap(map)
    }, [])

    const HandleMarkerClick = (value, event, id) => {
        if (event) {
            const lat = event.latLng.lat()
            const lng = event.latLng.lng();
            const station = props.markers.find(marker => id === marker.station_id)
            setInfoWindow(value)
            setPositionInfoWindow({
                lat,
                lng,
                stationName: station.name,
                bikesAvailable: props.stationsDetails.find(stationWithDetails => stationWithDetails.id === station.id).num_bikes_available,
                freeSpots: props.stationsDetails.find(stationWithDetails => stationWithDetails.id === station.id).num_docks_available
            })
        }
        setInfoWindow(value)
    }

    const onUnmount = React.useCallback(function callback() {
        setMap(null)
    }, [])

    const {markers} = props;
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyCD8nDBsxRkcRLHdKewuYXIkj2Dsfrvco8"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={OsloPosition}
                zoom={zoom}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onClick={() => setInfoWindow(null)}
            >
                {
                    markers.map(marker => {
                        return (
                            <Marker
                                position={{lat: marker.lat, lng: marker.lon}}
                                key={marker.station_id}
                                onClick={(event) => HandleMarkerClick(true, event, marker.station_id)}
                            />
                        )
                    })
                }
                {
                    infoWindow &&
                    <CustomInfoWindow
                        isVisible={infoWindow}
                        closeHandler={() => HandleMarkerClick(null)}
                        clickedMarkerData={infoWindowData}
                    />
                }
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(CustomGoogleMap)
