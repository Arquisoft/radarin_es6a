import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from "react-native";
import { ScreenContainer } from './components/ScreenContainer';
import { useRoute } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { log } from './scripts/Log';
import { data } from './scripts/UserData';

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

var load = null;

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
        this.loadMessage = this.load.bind(this);
    }
    componentDidMount() {
        log("Iniciando tarea de recarga automatica de mensajes.");
        this.load();
        this.startLoad();
    }
    componentWillUnmount() {
        log("Deteniendo tarea de recarga automatica de mensajes.");
        this.stopLoad();
    }
    async reload() {
        this.setState({ number: this.state.number + 1 });
    }
    async send() {
        if (this.state.mesagge != null) {
            this.state.chat.unshift({ id: uuid.v4(), msg: this.state.mesagge, own: true });
            let uri = "http://" + data.server.ip + ":" + data.server.port + "/api/chat/send";
            fetch(uri, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({
                    email1: data.user.cred.username + "." + (data.user.cred.idp.replace("https://", "")),
                    email2: this.state.friend.webID.replace("https://", ""),
                    mensaje: this.state.mesagge
                })
            });
            this.setState({ mesagge: null });
            this.reloadScreen();
        }
    }
    async load() {
        let uri = "http://" + data.server.ip + ":" + data.server.port + "/api/chat/list";
        fetch(uri, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                email1: data.user.cred.username + "." + (data.user.cred.idp.replace("https://", "")),
                email2: this.state.friend.webID.replace("https://", ""),
                mensaje: this.state.mesagge
            })
        })
            .then((response) => response.json())
            .then((json) => {
                let list = [];
                let me = data.user.cred.username + "." + (data.user.cred.idp.replace("https://", ""));
                for (var i = 0; i < json.length; i++) {
                    list.unshift({ id: uuid.v4(), msg: json[i].mensaje, own: me == json[i].emisor });
                }
                this.state.chat = list;
                this.reloadScreen();
            })
            .catch((error) => log('Error en la carga de mensajes: ' + error));
    }
    async startLoad() {
        load = setInterval(this.loadMessage, 2000);
    }
    async stopLoad() {
        clearInterval(load);
    }
    async
    render() {
        return (
            <ScreenContainer>
                <View style={styles.container}>
                    <View style={styles.chat}>
                        <FlatList
                            style={{ transform: [{ scaleY: -1 }] }}
                            keyExtractor={item => item.id}
                            data={this.state.chat}
                            renderItem={({ item }) => {
                                if (item.own) {
                                    return (
                                        <View style={styles.myMessage}>
                                            <Text style={styles.myText}>{item.msg}</Text>
                                        </View>
                                    );
                                } else {
                                    return (
                                        <View style={styles.hisMessage}>
                                            <Text style={styles.hisText}>{item.msg}</Text>
                                        </View>
                                    );
                                }
                            }}
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
                        <TouchableOpacity style={styles.messageView3} onPress={this.send.bind(this)}>
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
    myText: {
        textAlign: "right",
        fontSize: 20,
        margin: 10,
        backgroundColor: "#0275d8",
        borderRadius: 10,
        paddingVertical: 6,
        paddingHorizontal: 12,
        color: "white",
        marginLeft: 50
    },
    hisText: {
        textAlign: "left",
        fontSize: 20,
        margin: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginRight: 50
    },
    myMessage: {
        borderRadius: 10,
        transform: [{ scaleY: -1 }],
        flexDirection: "row-reverse"
    },
    hisMessage: {
        borderRadius: 10,
        transform: [{ scaleY: -1 }],
        flexDirection: "row"
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