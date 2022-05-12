import React, { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { projectFirestore } from "../firebase/firebaseConfig";
import DeletePost from "./DeletePost";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({lat: 0, lng: 0})

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCurrentLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude});
      })
    }

    const postRef = collection(projectFirestore, "Posts");
    const q = query(postRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(posts);
      console.log(posts);

    });
  }, []);

  const MyMapComponent = () => {
    return (
      <LoadScript 
      // googleMapsApiKey="AIzaSyCIV1WJa_KN22TB4L3M0YNCbIdmAjxJk1E"
      >
        <GoogleMap
          mapContainerStyle={{width: '900px', height: '600px'}}
          center={currentLocation}
          zoom={3}
        >
          {posts.map(({location}) => (
            <Marker position={{lat: location.latitude, lng: location.longitude}} />
          ))}
        </GoogleMap>
      </LoadScript>
    );
  }

  return (
    <div>
      <div className="card-container">
        {posts.length === 0 ? (
          <p>No posts found!</p>
        ) : (
          posts.map(({ id, title, imageUrl, createdAt, location }) => (
            <div className="card" key={id}>
              <img src={imageUrl} alt="title" />
              <h2>{title}</h2>
              <p>{createdAt.toDate().toDateString()}</p>
              <p>{location?.latitude}, {location?.longitude}</p>
              <DeletePost id={id} imageUrl={imageUrl} />
            </div>
          ))
        )}
      </div>
      <div className="map-container">
        <MyMapComponent isMarkerShown />
      </div> 
    </div>
  );
};

export default Posts;
