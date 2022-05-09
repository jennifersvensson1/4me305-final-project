import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Touchable } from 'react-native';
import { Camera as ExpoCamera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Icons from https://icons.expo.fyi/ 

// Initiates the camera
export const Camera = () => {
    let camera;
    const nav = useNavigation();
    const [hasPermission, setHasPermission] = useState(false);
    const [preview, setPreview] = useState(false);
    const [capturedPic, setCapturedPic] = useState(null);

    useEffect(() => {
        (async () => {
            const status = await ExpoCamera.requestCameraPermissionsAsync();
            setHasPermission(true);
        })();
    }, []);

    async function takePic() {
        const photo = await camera.takePictureAsync();
        setPreview(true);
        setCapturedPic(photo);
    }

    // Resets camera
    function retakePic() {
        setCapturedPic(null);
        setPreview(false);
    }

    // Navigates to upload page, sends captured pic as parameter
    function savePic() {
        // nav.navigate('Upload', capturedPic);
        nav.navigate('Upload');
    }

    // Renders the image preview
    const PicturePreview = (data) => {
        return (
        <View style={styles.camPreview}>
            <ImageBackground source={{ uri: data.photo.uri }} style={{ flex: 1}}>
            <View style={styles.btnContainerView}>
                <TouchableOpacity style={styles.capturedBtn} onPress={retakePic}>
                <Text>Re-take</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.capturedBtn} onPress={savePic}>
                <Ionicons name="arrow-forward" size={30} style={{color: '#000'}}></Ionicons> 
                </TouchableOpacity>
            </View>
            </ImageBackground>
        </View>
        );
    }

    // Renders the camera if permission was given, picture preview if photo has been taken, and an empty view if none of the above
    if (hasPermission === false) {
        return <View />;
    }
    if (preview && capturedPic) {
        return <PicturePreview photo={capturedPic}></PicturePreview>
    }
    return (
        <View style={styles.container}>
        <ExpoCamera type={ExpoCamera.Constants.Type.back} style={styles.camera} ref={(ref) => { camera = ref }}>
            <View style={styles.btnContainerView}>
            <View style={styles.btnView}>
                <TouchableOpacity style={styles.captureBtn} onPress={takePic}/>
            </View>
            </View>
        </ExpoCamera>
        </View>
    );
}

// Styles the components
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    content: {
      margin: 10
    },
    camera: {
        width: '100%',
        height: '100%'
    },
    btnContainerView: {
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      flex: 1,
      width: '100%',
      padding: 20,
      justifyContent: 'space-between'
    },
    btnView: {
      alignSelf: 'center',
      flex: 1,
      alignItems: 'center'
    },
    captureBtn: {
      width: 70,
      height: 70,
      bottom: 0,
      borderRadius: 50,
      borderColor: '#fff',
      borderWidth: 3,
      backgroundColor: 'transparent'
    },
    camPreview: {
      backgroundColor: 'transparent',
      flex: 1,
      width: '100%',
      height: '100%'
    },
    capturedBtn: {
      width: 90,
      height: 40,
      alignItems: 'center',
      borderRadius: 4,
      color: '#fff',
      backgroundColor: '#fff',
      justifyContent: 'center'
    }
  });