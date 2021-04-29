import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from './components/ScreenContainer';
import { data } from './scripts/UserData';

var logout = () => { data.user.logOut(reload) };
var reload = () => { };

export function ProfileLoadHandleLogout(func) {
    reload = func;
}

/**
 * Metodo que devuelve la vista del perfil del menu de navegación
 * @param {*} navigation 
 * @returns Vista del perfil del usuario
 */
export const Profile = ({ navigation }) => {
    return (
        <ScreenContainer>
            <View style={styles.container}>
                <Button title="logout" onPress={logout}></Button>
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