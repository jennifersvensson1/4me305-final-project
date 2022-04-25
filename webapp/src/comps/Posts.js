import React, { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { projectFirestore } from "../firebase/firebaseConfig";
import DeletePost from "./DeletePost";

const Posts = () => {
  const [posts, setPosts] = useState([]);

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
    });
  }, []);
  return (
    <div className="card-container">
      {posts.length === 0 ? (
        <p>No posts found!</p>
      ) : (
        posts.map(({ id, title, imageUrl, createdAt }) => (
          <div className="card" key={id}>
            <img src={imageUrl} alt="title" />
            <h2>{title}</h2>
            <p>{createdAt.toDate().toDateString()}</p>
            <DeletePost id={id} imageUrl={imageUrl} />
          </div>
        ))
      )}
    </div>
  );
};

export default Posts;
