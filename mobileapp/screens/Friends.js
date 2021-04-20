import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { ScreenContainer } from './components/ScreenContainer';

/**
 * Metodo que devuelve la vista de amigos del menu de navegación
 * @param {*} navigation 
 * @returns Vista de la lista de amigos del usuario
 */
export const Friends = ({ navigation }) => {
    return (
		<ScreenContainer>
			 <View style={styles.container}>
			   <FlatList
					data={[
						{key: 'Alba'},
						{key: 'Alejo'},
						{key: 'Andrés'},
						{key: 'Cova'},
						{key: 'Hugo'},
						{key: 'Pelayo'},
					]}
					renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
				/>
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
    },
	item: {
		fontSize: 40,
        marginTop: 10
	}
});