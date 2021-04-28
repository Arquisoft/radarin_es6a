import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { ScreenContainer } from './components/ScreenContainer';
import { data } from './scripts/UserData';
import { log } from './scripts/Log';
import { LocationCallback2 } from './scripts/Location';

/**
 * Metodo que devuelve la vista de amigos del menu de navegación
 * @param {*} navigation 
 * @returns Vista de la lista de amigos del usuario
 */
export const Friends = ({ navigation }) => {
	return (
		<FriendsView></FriendsView>
	);
};

class FriendsView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			number: 0
		};
		this.reloadScreen = this.reload.bind(this);
		LocationCallback2(this.reloadScreen);
	}
	async reload() {
		this.setState({ number: this.state.number + 1 });
	}
	render() {
		return (
			<ScreenContainer>
				<View style={styles.container}>
					<FlatList
						keyExtractor={item => item.webID}
						data={data.user.friends}
						renderItem={({ item }) => (
							<View style={styles.row}>
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
							</View>
						)}
					/>
				</View>
			</ScreenContainer>
		);
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
	}
});