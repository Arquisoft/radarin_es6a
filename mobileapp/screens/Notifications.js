import React, { useState } from "react";
import { StyleSheet, View, FlatList, StatusBar, Text, Alert, TouchableOpacity } from "react-native";
import { ScreenContainer } from './components/ScreenContainer';
import { data } from './scripts/UserData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LocationCallback1 } from './scripts/Location';

/**
 * Metodo que devuelve la vista de avisos del menu de navegación
 * @param {*} navigation 
 * @returns Vista de avisos
 */
export var Notifications = ({ navigation }) => {
    return (
        <NotificationsView></NotificationsView>
    );
};

class NotificationsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0
        };
        this.reloadScreen = this.reload.bind(this);
        LocationCallback1(this.reloadScreen);
    }
    async reload() {
        this.setState({ number: this.state.number + 1 });
    }
    render() {
        if (data.user.notifications.list.length == 0) {
            return (
                <ScreenContainer>
                    <View style={styles.vacioView}>
                        <Text style={styles.avisoVacio}>No hay avisos pendientes.</Text>
                        <MaterialCommunityIcons name="bell-off-outline" color={'#111'} size={40} />
                    </View>
                </ScreenContainer>
            );
        } else {
            return (
                <ScreenContainer>
                    <View style={styles.container}>
                        <FlatList
                            data={data.user.notifications.list}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.row} onPress={() => {
                                    let mensaje = "Tienes " + item.number + (item.number == 1 ? " amigo" : " amigos") + " cerca de tu posición. ";
                                    mensaje = mensaje + "Puedes acceder a la lista de amigos para " + (item.number == 1 ? "verlo" : "verlos") + "."
                                    Alert.alert(
                                        "Aviso de amigos cerca",
                                        mensaje,
                                        [
                                            { text: "Cerrar", onPress: () => { } }
                                        ]);
                                }}>
                                    <View style={styles.item}>
                                        <Text style={styles.date}>
                                            {item.date}
                                        </Text>
                                    </View>
                                    <View style={styles.item}>
                                        <Text style={styles.title}>{item.mensaje}</Text>
                                        <MaterialCommunityIcons
                                            name="close-thick" style={styles.x} color={'#999'} size={30}
                                            onPress={() => {
                                                data.user.notifications.deleteNotification(item.id);
                                                this.reloadScreen();
                                            }} />
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id}
                            onRefresh={this.reloadScreen}
                            refreshing={false}
                            extraData={data.user.notifications.list}
                        />
                    </View>
                </ScreenContainer >
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderRadius: 15,
        elevation: 5,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        color: '#333'
    },
    date: {
        fontSize: 14,
        color: '#333',
        marginBottom: 4
    },
    vacioView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    avisoVacio: {
        textAlign: "center",
        fontSize: 20,
        marginBottom: 15
    }
});