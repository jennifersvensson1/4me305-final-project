
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { projectFirestore } from '../firebase/firebaseConfig';
import { ScrollView } from 'react-native-gesture-handler';

// Initiates portfolio
export const Portfolio = () => {
    const [posts, setPosts] =  useState([]);

    useEffect(() => {
        const postRef = collection(projectFirestore, "Posts");
        const q = query(postRef, orderBy("createdAt", "desc"));
        onSnapshot(q, (snapshot) => {
            const posts = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPosts(posts);
            console.log(posts);
        })
    }, []);

    return (
      <View style={styles.container}>
            <ScrollView>
                {posts.length === 0 ? 
                    ( <Text>No posts found!</Text>) : 
                    (posts.map(({ id, title, imageUrl, createdAt }) => (
                        <View key={id} style={styles.card}>
                            <Image style={styles.cardImg} source={{ uri: imageUrl, }} />
                            <Text style={styles.cardTitle}>{title}</Text>
                            <Text>{createdAt.toDate().toDateString()}</Text>
                        </View>
                    )))
                }
            </ScrollView>
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
    card: {
        marginTop: 30, 
        width: 320,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardImg: {
        width: 250,
        height: 150,
    },
    cardTitle: {
        fontSize: 20,
        padding: 10
    }
  });