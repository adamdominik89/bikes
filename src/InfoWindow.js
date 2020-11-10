import React from 'react'
import {InfoWindow} from "@react-google-maps/api";

const CustomInfoWindow = (props) => {
    const {
        clickedMarkerData,
        isVisible,
        closeHandler
    } = props;
    const position = {
        lat: clickedMarkerData.lat,
        lng: clickedMarkerData.lng
    }
    const {
        stationName,
        bikesAvailable,
        freeSpots
    } = clickedMarkerData;
    return (
        <> {
            isVisible ?
            <InfoWindow position={position} onCloseClick={closeHandler}>
                <div id="content">
                    <h1 id="firstHeading"> Station Name: {stationName}</h1>
                    <div id="bodyContent">
                        <div>
                            Amount of available bikes: {bikesAvailable}
                        </div>
                        <div>
                            Amount of free spots: {freeSpots}
                        </div>
                    </div>
                </div>
            </InfoWindow> : null
        }
        </>
    )
}

export default CustomInfoWindow;
