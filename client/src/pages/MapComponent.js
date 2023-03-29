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
    console.log(coordinate);
    if (coordinate != null || coordinate.length != 0 ) {
        console.log("hyu");
        lat_number = coordinate.lat
        lng_number = coordinate.lng
        const center = {
            lat: lat_number,
            lng: lng_number
        }
        console.log(center);
        if (center.lat === undefined || center.lng === undefined) {
            return (
                <>Something went wrong</>
            )
        }
        else {
            return (
                <div>
                    <LoadScript googleMapsApiKey="ApiKey">
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
    else {
        return (
            <>Something went wrong</>
        )
    }

}

