import React, { useState, useEffect } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Timestamp, collection, addDoc, GeoPoint } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { projectStorage, projectFirestore } from "../firebase/firebaseConfig";
import { Ionicons } from '@expo/vector-icons'; // Icons from https://icons.expo.fyi/ 

import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { TextInput } from 'react-native-gesture-handler';
import { FirebaseError } from 'firebase/app';

// Initiates upload options
export const Upload = (props) => {
	const nav = useNavigation(); 
    const [hasPermission, setHasPermission] = useState(null);
    const [currentLocation, setCurrentLocation] = useState({});
	const [title, setTitle] = useState("");
	const [modalText, setModalText] = useState("");
	const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
		(async () => {
			let mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
			setHasPermission(mediaLibraryStatus === 'granted');
		})();

		(async () => {
			let locationStatus = await Location.requestForegroundPermissionsAsync();
			if (locationStatus.status !== 'granted') {
				console.log("Permission to access location was denied")
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setCurrentLocation({ lat: location.coords.latitude, lon: location.coords.longitude });
		})();
    }, []);

	async function uploadImageAsync() {
		const blob = await new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.onload = function () {
				resolve(xhr.response);
			}
			xhr.onerror = function (e) {
				console.log(e);
				reject(new TypeError("Network request failed"));
			}
			xhr.responseType = "blob";
			xhr.open("GET", props.route.params.uri, true);
			xhr.send(null);
		});

		const storageRef = ref(projectStorage, `/images/picture-${Date.now()}`);
		const uploadImage = uploadBytesResumable(storageRef, blob);

		uploadImage.on(
			"state_changed",
			(snapshot) => {
				const progressPercent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
				console.log(progressPercent);
			},
			(err) => {
				console.log(err);
			},
			() => {
				setTitle("");

				getDownloadURL(uploadImage.snapshot.ref).then((url) => {
					const postRef = collection(projectFirestore, "Posts");
					addDoc(postRef, {
						title: title,
						imageUrl: url,
						createdAt: Timestamp.now().toDate(),
						location: new FirebaseError.firestore.GeoPoint(currentLocation.lat, currentLocation.lon)
					})
					.then(() => {
						console.log("Post added successfully!");
						nav.navigate("Post");
					})
					.catch((err) => {
						console.log("Error when trying to add the post");
					})
				});
			}
		)
	}

	async function saveImage() {
		const asset = await MediaLibrary.createAssetAsync(props.route.params.uri);

		setModalText('Photo has been saved to your library!');
        setModalVisible(true);
	}

    return (
        <View style={styles.container}>
			<Image style={{ width: props.route.params.width, height: props.route.params.height }} source={{ uri: props.route.params.uri}}></Image>
			
			<View style={styles.content}>
				<Text style={styles.header}>Title:</Text>
				<TextInput placeholder="Write your title here" style={styles.input} onChangeText={(t) => setTitle(t)}></TextInput>
				<TouchableOpacity style={styles.publishBtn} onPress={uploadImageAsync}>
					<Text style={styles.btnText}>Publish</Text>
				</TouchableOpacity>
			</View>
			
			<TouchableOpacity style={styles.saveBtn} onPress={saveImage}>
				<Ionicons name="download-outline" size={20} color={'white'}></Ionicons>
				<Text style={styles.btnText}>Save image</Text>
			</TouchableOpacity>
        </View>
    );
  }

const styles = StyleSheet.create({
    container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
    },
	content: {
		alignItems: 'center',
		margin: 30
	},
	header: {
		fontSize: 20,
	},
	input: {
		margin: 10,
		padding: 5,
		height: 40,
		width: 220,
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#f0f0f0'
	},
	publishBtn: {
		backgroundColor: 'rgb(35, 166, 218)',
		color: 'white',
		padding: 10,
		width: 100,
		alignItems: 'center',
		margin: 10
	},
	saveBtn: {
		backgroundColor: 'rgb(218, 108, 6)',
		color: 'white',
		padding: 10,
		width: 130,
		flexDirection: 'row',
	},
	btnText: {
		fontSize: 16,
		color: 'white'
	}
  });