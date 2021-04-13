import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { startBackgroundFunction, stopBackgroundFunction, setBackgroundInterval } from '../scripts/Background'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10,
        borderRadius: 5
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    text: {
        textAlign: "center",
        fontSize: 22,
        marginTop: 10
    }
});

const ScreenContainer = ({ children }) => {
    return (
        <View style={styles.container}>{children}</View>
    );
}

export const Home = ({ navigation }) => {
    return (
        <ScreenContainer>
            <Text style={styles.text}>Bienvenido a Radarin</Text>
        </ScreenContainer>
    );
};

export const Profile = ({ navigation }) => {
    return (
        <ScreenContainer>
            <Text style={styles.text}>Proximamente</Text>
        </ScreenContainer>
    );
};

export const Geo = ({ navigation }) => {
    return (
        <ScreenContainer>
            <View style={styles.buttons}>
                <Button title="Iniciar" style={styles.button} onPress={startBackgroundFunction} />
                <Button title="Parar" style={styles.button} onPress={stopBackgroundFunction} />
                <Button title="3s" style={styles.button} onPress={() => setBackgroundInterval(3)} />
                <Button title="10s" style={styles.button} onPress={() => setBackgroundInterval(10)} />
            </View>
        </ScreenContainer>
    );
};