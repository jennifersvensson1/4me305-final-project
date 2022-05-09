import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Initiates portfolio
export const Post = () => {
    const nav = useNavigation();
    return (
      <View style={styles.container}>
        <Button title="Take picture" style={styles.button} onPress={() => { nav.navigate('Camera')}}></Button>
        <Button title="Record sound" style={styles.button} onPress={() => { nav.navigate('Audio')}}></Button>
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
        flex: 1, 
        alignItems: 'flex-start', 
        margin: 50
    }
  });