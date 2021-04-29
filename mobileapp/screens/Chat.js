import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from './components/ScreenContainer';
import { selectedFriend } from './Friends';

/**
 * Metodo que devuelve el chat con un amigo
 * @param {*} navigation 
 * @returns Chat
 */
export const Chat = ({ navigation }) => {
    return (
        <ChatView></ChatView>
    );
};

class ChatView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            friend: selectedFriend.item
        };
        selectedFriend.item = null;
        console.log(this.state.friend);
        this.reloadScreen = this.reload.bind(this);
    }
    async reload() {
        this.setState({ number: this.state.number + 1 });
    }
    render() {
        return (
            <ScreenContainer>
                <View style={styles.container}>
                    <Text style={styles.text}>{"Esto es el chat con " + this.state.friend.username}</Text>
                </View>
            </ScreenContainer>
        );
    }
}

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