import React, { useState, useEffect } from 'react';
import { Button, Image, Modal, StyleSheet, Text, View } from 'react-native';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { projectFirestore, projectStorage } from '../firebase/firebaseConfig';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { deleteObject, ref } from 'firebase/storage';

// Initiates portfolio
export const Portfolio = () => {
    const [posts, setPosts] =  useState([]);
    const [modalText, setModalText] = useState("");
	const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const postRef = collection(projectFirestore, "Posts");
        const q = query(postRef, orderBy("createdAt", "desc"));
        onSnapshot(q, (snapshot) => {
            const posts = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPosts(posts);
        })

        return () => {
            setPosts([]);
        }
    }, []);

    async function deletePostAsync(id, imageUrl) {
        try {
            await deleteDoc(doc(projectFirestore, "Posts", id));
            const storageRef = ref(projectStorage, imageUrl);
            await deleteObject(storageRef);

            setModalText('Post deleted successfully');
            setModalVisible(true);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
      <View style={styles.container}>
            <Modal animationType="slide" transparent={true} visible={modalVisible} style={{margin: 0}}>
				<View style={styles.modalView}>
				    <Text>{modalText}</Text>
				    <Button title="OK" onPress={() => setModalVisible(false)}></Button>
				</View>
			</Modal>

            <ScrollView>
                {posts.length === 0 ? 
                    ( <Text>No posts found!</Text>) : 
                    (posts.map(({ id, title, imageUrl, createdAt }) => (
                        <View key={id} style={styles.card}>
                            <Image style={styles.cardImg} source={{ uri: imageUrl, }} />
                            <Text style={styles.cardTitle}>{title}</Text>
                            <Text>{createdAt.toDate().toDateString()}</Text>
                            <TouchableOpacity style={styles.deleteBtn} onPress={() => { deletePostAsync(id, imageUrl) }}>
                                <Text style={styles.btnText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )))
                }
            </ScrollView>
      </View>
    );
}

// Styles the components
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
        marginTop: 20, 
        marginBottom: 20,
        width: 250,
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
    },
    deleteBtn: {
		padding: 5,
		width: 80,
		margin: 10,
        alignItems: 'center'
	},
	btnText: {
		fontSize: 16,
        color: '#dc3545'
	},
    modalView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'whitesmoke',
		shadowColor: '#000',
		shadowOpacity: 0.25,
		shadowOffset: {
		  width: 0,
		  height: 2
		},
		borderRadius: 10
	}
  });