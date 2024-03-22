import React, { useState, useEffect } from "react";
import { Text, View, Button, Image, StyleSheet } from "react-native";
import * as ImagePicker from 'expo-image-picker';

const Bai1 = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Xin lỗi, chúng tôi cần quyền truy cập vào thư viện hình ảnh để hoạt động.');
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image 
                    source={{ uri: selectedImage || 'https://i.pinimg.com/564x/93/ee/66/93ee661d1d52408f56b620a789b18131.jpg' }}
                    style={styles.image}
                />
            </View>
            <Button 
                title="Chọn ảnh từ thư viện"
                onPress={pickImage}
                color="#007bff"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
    },
    imageContainer: {
        width: 250,
        height: 250,
        borderRadius: 125,
        overflow: 'hidden',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#CC66FF',
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
});

export default Bai1;
