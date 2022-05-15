import React from 'react'
import { projectFirestore, projectStorage } from '../firebase/firebaseConfig.js';
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

// Deletes post from the webpage
const DeletePost = ({id, imageUrl}) => {
  const handleDelete = async () => {
      if (window.confirm("Are you sure you want to delete this post?")) {
        try {
          await deleteDoc(doc(projectFirestore, "Posts", id));
          toast("Post deleted successfully", { type: "success" });
          const storageRef = ref(projectStorage, imageUrl);
          await deleteObject(storageRef);
        } catch (error) {
          toast("Error deleting post", { type: "error" });
          console.log(error);
        }
      }
  };

  return (
    <div>
        <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default DeletePost;