import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { ScreenContainer } from './components/ScreenContainer';
import { data } from './scripts/UserData';
import { log } from './scripts/Log';

/**
 * Metodo que devuelve la vista de amigos del menu de navegación
 * @param {*} navigation 
 * @returns Vista de la lista de amigos del usuario
 */
export const Friends = ({ navigation }) => {
	log("***** En la lista de amigos " + data.user.friends);
    return (
		<ScreenContainer>
			 <View style={styles.container}>
			   <FlatList
					data={data.user.friends}
					renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
				/>
			</View>
		</ScreenContainer>

    );
};

/* getFriends: async (idp, user, password) => {
	var uri = "http://" + data.server.ip + ":" + data.server.port + "/api/user/friends";
	var result = await fetch(uri, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}, body: JSON.stringify({
		})
	})
		.then((response) => response.json())
		.then((json) => {
			log('Resultado de iniciar sesion: ' + json.result);
			if (json.result) {
				console.log(json.result);
				return true;
			}
			return false;
		})
		.catch((error) => {
			log('No se ha podido iniciar sesión.');
			log(error);
			return false;
		});
	return result;
} */

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
    },
	item: {
		fontSize: 27,
        marginTop: 10,
		backgroundColor: '#f9c2ff',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16
	}
});