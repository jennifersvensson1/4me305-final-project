import React, { useState, useEffect } from 'react';
import { Button, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Timestamp, collection, addDoc, GeoPoint } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { projectStorage, projectFirestore } from "../firebase/firebaseConfig";
import { Ionicons } from '@expo/vector-icons'; // Icons from https://icons.expo.fyi/ 

import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { TextInput } from 'react-native-gesture-handler';

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

	// Uploads image to firebase
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
						location: new GeoPoint(currentLocation.lat, currentLocation.lon)
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

	// Saves image to media library
	async function saveImage() {
		const asset = await MediaLibrary.createAssetAsync(props.route.params.uri);

		setModalText('Photo has been saved to your library!');
        setModalVisible(true);
	}

    return (
        <View style={styles.container}>
			<Modal animationType="slide" transparent={true} visible={modalVisible} style={{margin: 0}}>
				<View style={styles.modalView}>
				<Text>{modalText}</Text>
				<Button title="OK" onPress={() => setModalVisible(false)}></Button>
				</View>
			</Modal>
			
			<View style={styles.content}>
				<Text style={styles.header}>Title:</Text>
				<TextInput placeholder="Write your title here" style={styles.input} onChangeText={(t) => setTitle(t)}></TextInput>
				<TouchableOpacity style={styles.publishBtn} onPress={uploadImageAsync}>
					<Text style={styles.btnText}>Publish</Text>
				</TouchableOpacity>
			</View>

			<Image style={{ width: 160, height: 280 }} source={{ uri: props.route.params.uri}}></Image>
			
			<TouchableOpacity style={styles.saveBtn} onPress={saveImage}>
				<Ionicons name="download-outline" size={20} color={'white'}></Ionicons>
				<Text style={styles.btnText}>Save image</Text>
			</TouchableOpacity>
        </View>
    );
  }

// Styles the components
const styles = StyleSheet.create({
    container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
    },
	content: {
		alignItems: 'center',
		margin: 10
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
		margin: 10
	},
	btnText: {
		fontSize: 16,
		color: 'white'
	},
	modalView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'whitesmoke',
		shadowColor: '#000',
		shadowOpacity: 0.25,
		shadowOffset: {
		  width: 0,
		  height: 2
		},
		borderRadius: 10
	}
  });