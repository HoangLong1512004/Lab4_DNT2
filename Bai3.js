import React, { useState } from "react";
import { Audio } from "expo-av";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function Bai3() {
    const [sound, setSound] = useState(null); // Sử dụng useState

    // ---- Định nghĩa hàm play bản nhạc
    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
            { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }
        );
        setSound(sound);
        await sound.playAsync();
    }

    // Định nghĩa hàm tạm dừng
    async function pauseSound() {
        if (sound) {
            await sound.stopAsync();
        }
    }

    return (
        <View style={styles.container}>
            <Image 
                source={{uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'}} 
                style={styles.albumCover}
            />
            <Text style={styles.title}>Tên bài hát</Text>
            <View style={styles.buttons}>
                <TouchableOpacity onPress={playSound} style={styles.button}>
                    <Text style={styles.buttonText}>Play</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={pauseSound} style={styles.button}>
                    <Text style={styles.buttonText}>Pause</Text>
                </TouchableOpacity>
            </View>
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
    albumCover: {
        width: 250,
        height: 250,
        marginBottom: 30,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttons: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginHorizontal: 10,
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    }
});
