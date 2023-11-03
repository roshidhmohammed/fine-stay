import React, { useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import { FaMapMarkerAlt } from "react-icons/fa";
import "mapbox-gl/dist/mapbox-gl.css";

const PropertyLocationField = ({ currentLocation, setCurrentLocation }) => {
  const accesToken = `${process.env.REACT_APP_MAPBOX_ACCESSTOKEN}`;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
          fetchPlaceName(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  }, []);

  const fetchPlaceName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESSTOKEN}`
      );
      const data = await response.json();
      const place = data.features[0];
      const city = place.context.find((context) =>
        context.id.startsWith("place")
      ).text;
      const district = place.context.find((context) =>
        context.id.startsWith("district")
      ).text;
      const state = place.context.find((context) =>
        context.id.startsWith("region")
      ).text;
      const placeName = city + "," + district + "," + state;
      setCurrentLocation((prevLocation) => ({ ...prevLocation, placeName }));
    } catch (error) {
      console.error("Error fetching places", error);
    }
  };

  const handleMarker = (e) => {
    const { lngLat } = e;
    setCurrentLocation({
      latitude: lngLat.lat,
      longitude: lngLat.lng,
    });
    fetchPlaceName(lngLat.lat, lngLat.lng);
  };

  return (
    <div className="mt-2 ">
      <Map
        mapboxAccessToken={accesToken}
        initialViewState={{
          longitude: currentLocation.longitude,
          latitude: currentLocation.latitude,
          zoom: 5,
        }}
        style={{ position: "relative", width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-12"
      >
        <Marker
          longitude={currentLocation.longitude}
          latitude={currentLocation.latitude}
          offsetRight="-20"
          draggable={true}
          onDrag={handleMarker}
          anchor="bottom"
          style={{ cursor: "pointer" }}
        >
          <FaMapMarkerAlt size={30} />
        </Marker>
      </Map>
    </div>
  );
};

export default PropertyLocationField;
