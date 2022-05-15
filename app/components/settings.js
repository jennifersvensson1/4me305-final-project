import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Initiates settings
export const Settings = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    );
  }

// Styles the components
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center'
    },
    btn: {
      backgroundColor: 'rgb(218, 108, 6)',
      color: 'white',
      padding: 10,
      width: 150,
      alignItems: 'center',
      margin: 10
    },
    btnText: {
      color: 'white',
      fontSize: 16
    }
  });