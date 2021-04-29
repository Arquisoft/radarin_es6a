import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { ScreenContainer } from './components/ScreenContainer';
import { data } from './scripts/UserData';
import { log } from './scripts/Log';
import { LocationCallback2 } from './scripts/Location';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export var selectedFriend = {
	item: null
};

/**
 * Metodo que devuelve la vista de amigos del menu de navegación
 * @param {*} navigation 
 * @returns Vista de la lista de amigos del usuario
 */
export const Friends = ({ navigation }) => {
	return (
		<FriendsView nav={navigation}></FriendsView>
	);
};

class FriendsView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			number: 0,
			reload: false,
			mensaje: "No hay amigos disponibles."
		};
		this.reloadScreen = this.reload.bind(this);
		this.reloadFriendsList = this.reloadFriends.bind(this);
		LocationCallback2(this.reloadScreen);
	}
	async reload() {
		this.setState({ number: this.state.number + 1 });
	}
	async reloadFriends() {
		this.setState({ reload: true });
		this.setState({ mensaje: "Recargando..." });
		log("Recargando amigos.");
		await data.user.reloadFriends();
		this.setState({ mensaje: "No hay amigos disponibles." });
		this.setState({ reload: false });
	}
	lista() {
		if (data.user.friends.length == 0) {
			return (
				<View style={styles.vacioView}>
					<Text style={styles.avisoVacio}>{this.state.mensaje}</Text>
					<MaterialCommunityIcons name="reload" color={'#333'} size={40} onPress={this.reloadFriendsList} />
				</View>
			);
		}
		return (
			<FlatList
				keyExtractor={item => item.webID}
				data={data.user.friends}
				onRefresh={this.reloadFriendsList}
				refreshing={this.state.reload}
				renderItem={({ item }) => (
					<TouchableOpacity style={styles.row} onPress={() => {
						selectedFriend.item = item;
						this.props.nav.push("Mensajes");
					}}>
						<View style={styles.item}>
							<Text style={styles.idp}>
								{item.idp}
							</Text>
							<Text style={styles.near}>
								{item.near ? "Cerca de ti" : ""}
							</Text>
						</View>
						<View style={styles.item}>
							<Text style={styles.title}>{item.username}</Text>
						</View>
					</TouchableOpacity>
				)}
			/>
		);
	}
	render() {
		return (
			<ScreenContainer>
				<View style={styles.header}>
					<View style={{ width: "90%" }}>
						<Text style={styles.headerText}>{"Ultima comprobación: " + (data.user.lastCheck == null ? "Ninguna" : data.user.lastCheck)}</Text>
					</View>
				</View>
				<View style={styles.container}>
					{this.lista()}
				</View>
			</ScreenContainer>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 9.2,
	},
	header: {
		flex: 0.8,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		borderRadius: 15,
		elevation: 3,
		margin: 5,
		marginTop: 10,
		alignItems: "center",
		justifyContent: "center"
	},
	headerText: {
		alignSelf: "flex-start"
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
	idp: {
		fontSize: 14,
		color: '#333',
		marginBottom: 4
	},
	near: {
		fontSize: 14,
		color: '#0275d8',
		marginBottom: 4,
		fontWeight: "bold"
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


