import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from './components/ScreenContainer';

/**
 * Metodo que devuelve la vista del perfil del menu de navegación
 * @param {*} navigation 
 * @returns Vista del perfil del usuario
 */
export const Profile = ({ navigation }) => {
    return (
        <ScreenContainer>
            <View style={styles.container}>
                <Text style={styles.text}>Proximamente...</Text>
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        textAlign: "center",
        fontSize: 22,
        marginTop: 10
    }
});