import React, { useEffect, useState } from "react";
import { LoadScript, GoogleMap, Marker} from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { getMap } from "../actions/EventAction";

export const MapComponent = (props) => {
    const {address} = props
    console.log(address);
    const Map = useSelector(store => store.Events.map)
    let [lat_number, setLat] = useState()
    let [lng_number, setLng] = useState()

    const dispatch = useDispatch()
    useEffect ( () => {
        dispatch(getMap(address))
    }, [dispatch, address])
    const mapStyle = {
        width:'600px',
        height:'400px'
    }
    let coordinate = Map

    if (coordinate != []) {
        lat_number = coordinate.lat
        lng_number = coordinate.lng
        const center = {
            lat: lat_number,
            lng: lng_number
        }
        console.log(center);
        return (
            <div>
                <p>hyu</p>
            <LoadScript googleMapsApiKey="">
                <GoogleMap 
                    mapContainerStyle={mapStyle} 
                    center={center}
                    zoom={15}
                >    
                    <Marker position={center} />
                </GoogleMap>
            </LoadScript>
            </div>
        )
    }

}

