import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from "react-native";
import { ScreenContainer } from './components/ScreenContainer';
import { useRoute } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { log } from './scripts/Log';

/**
 * Metodo que devuelve el chat con un amigo
 * @param {*} navigation 
 * @returns Chat
 */
export const Chat = ({ navigation }) => {
    return (
        <ChatView>{useRoute().params.friend}</ChatView>
    );
};

class ChatView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            friend: props.children,
            chat: [],
            mesagge: null
        };
        log("Accediendo a chat de " + this.state.friend.username + " de " + this.state.friend.idp)
        this.reloadScreen = this.reload.bind(this);
        this.sendMessage = this.send.bind(this);
    }
    async reload() {
        this.setState({ number: this.state.number + 1 });
    }
    async send() {
        console.log(this.state);
        if (this.state.mesagge != null) {
            this.state.chat.unshift({ id: uuid.v4(), msg: this.state.mesagge });
            this.setState({ mesagge: null });
            this.reloadScreen();
        }
    }
    render() {
        return (
            <ScreenContainer>
                <View style={styles.container}>
                    <View style={styles.chat}>
                        <FlatList
                            style={{ transform: [{ scaleY: -1 }] }}
                            keyExtractor={item => item.id}
                            data={this.state.chat}
                            renderItem={({ item }) => (
                                <View style={styles.myMessage}>
                                    <Text style={styles.text}>{item.msg}</Text>
                                </View>
                            )}
                        />
                    </View>
                    <View style={styles.messageView} >
                        <View style={styles.messageView2}>
                            <TextInput
                                style={styles.messageWriteInput}
                                placeholder="Escribe un mensaje"
                                keyboardType='default'
                                placeholderTextColor="#aaa"
                                disabled={false}
                                value={this.state.mesagge}
                                onChangeText={text => { this.setState({ mesagge: text }) }} />
                        </View>
                        <TouchableOpacity style={styles.messageView3} onPress={this.sendMessage}>
                            <MaterialCommunityIcons name="send" color={'#eee'} size={25} style={styles.messageSendInput} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScreenContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eee"
    },
    chat: {
        flex: 1
    },
    text: {
        textAlign: "center",
        fontSize: 22,
        marginTop: 10
    },
    myMessage: {
        borderRadius: 10,
        backgroundColor: "green",
        transform: [{ scaleY: -1 }]
    },
    messageView: {
        margin: 10,
        flexDirection: "row"
    },
    messageView2: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 30,
        height: 50,
        width: "70%",
        marginRight: 10
    },
    messageView3: {
        backgroundColor: "#0275d8",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 100,
        width: 50,
        height: 50,
    },
    messageWriteInput: {
        fontSize: 16,
        height: 50,
        marginHorizontal: 12
    },
    messageSendInput: {
    }
});