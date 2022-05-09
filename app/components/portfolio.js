import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

// Initiates portfolio
export const Portfolio = () => {
    return (
      <View style={styles.container}>
        <Text>Posts here</Text>
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