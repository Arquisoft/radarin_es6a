import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

/**
 * Contenedor para las vistas del menu de navegacion
 * @param {Component} children 
 * @returns Contenedor de vistas
 */
export const ScreenContainer = ({ children }) => {
    return (
        <View style={styles.container}>{children}</View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});