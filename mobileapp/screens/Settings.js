import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { ScreenContainer } from './components/ScreenContainer';


export const Settings = ({ navigation }) => {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [isEnabled2, setIsEnabled2] = useState(false);
    const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);

    return (
        <ScreenContainer>
            <View style={styles.container}>
                <View style={styles.line}>
                    <Text style={styles.text}>Habilitar geolocalización</Text>
                    <Switch
                        style={styles.botton}
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#7ca8f2" : "#f4f3f4"}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <View style={styles.line}>
                    <Text style={styles.text}>Habilitar notificaciones</Text>
                    <Switch
                        style={styles.botton}
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled2 ? "#7ca8f2" : "#f4f3f4"}
                        onValueChange={toggleSwitch2}
                        value={isEnabled2}
                    />
                </View>
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    line: {
        flexDirection: 'row',
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 15
    },
    text: {
        flex: 5,
        textAlign: "left",
        fontSize: 20,
        marginTop: 10
    },
    botton: {
        flex: 2,
        marginTop: 12,
        marginRight: 10
    }
});