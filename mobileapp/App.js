import React from 'react';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import { startBackgroundFunction, stopBackgroundFunction, setBackgroundInterval } from './scripts/Background'

const App: () => React$Node = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>

      </View>
      <View style={styles.buttons}>
        <Button title="Iniciar" onPress={startBackgroundFunction} />
        <Button title="Parar" onPress={stopBackgroundFunction} />
        <Button title="3s" onPress={() => setBackgroundInterval(3)} />
        <Button title="10s" onPress={() => setBackgroundInterval(10)} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }, main: {
    flex: 7,
    backgroundColor: '#ddd',
    borderColor: '#000',
    borderBottomWidth: 2
  }, buttons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
});

export default App;
