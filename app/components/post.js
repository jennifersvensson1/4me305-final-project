import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Initiates portfolio
export const Post = () => {
    const nav = useNavigation();
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.btn} onPress={() => { nav.navigate('Camera')}}>
          <Text style={styles.btnText}>Take picture</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.btn} onPress={() => { nav.navigate('Audio')}}>
          <Text style={styles.btnText}>Record sound</Text>
        </TouchableOpacity> */}
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
    btn: {
        backgroundColor: 'rgb(35, 166, 218)',
        color: 'white',
        padding: 20,
        width: 300,
        alignItems: 'center',
        margin: 10
    },
    btnText: {
      color: 'white',
      fontSize: 20
    }
  });