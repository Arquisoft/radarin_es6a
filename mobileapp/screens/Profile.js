import React from "react";
import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { ScreenContainer } from './components/ScreenContainer';
import { data } from './scripts/UserData';

var logout = () => { data.user.logOut(reload) };
var reload = () => { };

export function ProfileLoadHandleLogout(func) {
    reload = func;
}

function photo() {
    return data.user.photo == null ? require('../assets/profile.png') : { uri: data.user.photo };
}

/**
 * Metodo que devuelve la vista del perfil del menu de navegación
 * @param {*} navigation 
 * @returns Vista del perfil del usuario
 */
export const Profile = ({ navigation }) => {
    return (
        <ScreenContainer>
            <View style={styles.panel}>
                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image source={photo()} style={styles.image} resizeMode="center"></Image>
                    </View>
                </View>
                <View style={styles.nameView}>
                    <Text style={styles.name}>{data.user.name}</Text>
                </View>
            </View>
            <View style={styles.panel2}>
                <View style={styles.panel3}>
                    <View style={styles.elemento}>
                        <View style={styles.espacio}>
                        </View>
                        <Text style={styles.subText}>Nombre de usuario</Text>
                    </View>
                    <View style={styles.elemento2}>
                        <View style={styles.espacio}>
                            <View style={styles.indicador}></View>
                        </View>
                        <View>
                            <Text style={styles.text}>{data.user.cred.username}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.panel4}>
                    <View style={styles.elemento}>
                        <View style={styles.espacio}>
                        </View>
                        <Text style={styles.subText}>Proveedor</Text>
                    </View>
                    <View style={styles.elemento2}>
                        <View style={styles.espacio}>
                            <View style={styles.indicador}></View>
                        </View>
                        <View>
                            <Text style={styles.text}>{data.user.cred.idp}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.panel5}>
                    <View style={{ alignItems: "center" }}>
                        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                            <Text style={styles.logoutText}>Cerrar Sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
    panel: {
        flex: 5.5,
        justifyContent: "center",
        borderBottomWidth: 1,
        borderColor: "#bbb",
        marginBottom: 10,
        backgroundColor: "#eee"
    },
    panel2: {
        flex: 4.5
    },
    panel3: {
        flex: 1,
        marginTop: 20
    },
    panel4: {
        flex: 1
    },
    panel5: {
        flex: 1,
        marginBottom: 20
    },
    text: {
        color: "#52575D"
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "#047cfc",
        marginTop: 20,
        backgroundColor: "#fff"
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    nameView: {
        marginBottom: 20,
        marginTop: 20
    },
    name: {
        textAlign: "center",
        fontSize: 24,
        color: "#444"
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    elemento: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    elemento2: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 22
    },
    indicador: {
        backgroundColor: "#047cfc",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20,
        marginLeft: 40
    },
    espacio: {
        width: "25%",
        alignItems: "center"
    },
    logoutBtn: {
        width: "40%",
        backgroundColor: "#047cfc",
        borderRadius: 25,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10
    },
    logoutText: {
        fontSize: 16,
        color: "white"
    }
});