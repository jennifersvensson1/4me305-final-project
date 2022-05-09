import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Touchable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Initiates the camera
export const Camera = () => {
    const nav = useNavigation();
    return (
        <View style={styles.container}>
            <Text>Camera here</Text>
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
  });
