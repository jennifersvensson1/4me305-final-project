import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

// Initiates settings
export const Settings = () => {
    return (
      <View style={styles.container}>
        <Button title="Sign out"></Button>
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center'
    },
  });