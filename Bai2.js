import React, { useRef, useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";

const Bai2 = () => {
    const [hasPer, setHasPer] = useState(null);
    const [photoUri, setPhotoUri] = useState(null);

    const cameraRef = useRef();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPer(status === 'granted');
        })();
    }, []);

    const chup = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            console.log('Ảnh đã được chụp: ', photo.uri);
            setPhotoUri(photo.uri);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.cameraContainer}>
                {hasPer ? (
                    <Camera style={styles.camera} ref={cameraRef} type={Camera.Constants.Type.back} />
                ) : (
                    <Text style={styles.noPermissionText}>Không có quyền truy cập camera</Text>
                )}
            </View>
            <View style={styles.avatarContainer}>
                {photoUri ? (
                    <Image source={{ uri: photoUri }} style={styles.avatar} />
                ) : (
                    <Image source={{ uri: 'https://i.pinimg.com/564x/93/ee/66/93ee661d1d52408f56b620a789b18131.jpg' }} style={styles.avatar} />
                )}
            </View>
            <TouchableOpacity style={styles.captureButton} onPress={chup}>
                <Text style={styles.captureText}>Chụp ảnh</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
    },
    cameraContainer: {
        width: '100%',
        height: '50%',
        overflow: 'hidden',
        borderRadius: 10,
        marginBottom: 20,
    },
    avatarContainer: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: 'hidden',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: 'blue',
    },
    avatar: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
    camera: {
        flex: 1,
    },
    noPermissionText: {
        fontSize: 18,
        color: 'red',
    },
    captureButton: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 10,
    },
    captureText: {
        color: 'white',
        fontSize: 18,
    },
});

export default Bai2;
