import React, { useState } from "react";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { projectStorage, projectFirestore } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";

const AddPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
  });

  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handlePublish = () => {
    if (!formData.title || !formData.image) {
      alert("Seems like you missed a field, please fill all of the fields");
      return;
    }

    const storageRef = ref(projectStorage, `/images/${Date.now()}${formData.image.name}`);

    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setFormData({
          title: "",
          image: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const postRef = collection(projectFirestore, "Posts");
          addDoc(postRef, {
            title: formData.title,
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
          })
            .then(() => {
              toast("Post added successfully", { type: "success" });
              setProgress(0);
            })
            .catch((err) => {
              toast("Error when trying to add the post", { type: "error" });
            });
        });
      }
    );
  };

  return (
    <div className="add-post-form" >
      <h2>Post to the portfolio</h2>
      <label htmlFor="">Title</label>
      <input type="text" name="title" className="form-control" value={formData.title} onChange={(e) => handleChange(e)} />

      <label htmlFor="">Image</label>
      <input type="file" name="image" className="form-control" onChange={(e) => handleImageChange(e)} />

      {progress === 0 ? null : (
        <div className="progress">
          <div className="progress-bar progress-bar-striped mt-1" style={{ width: `${progress}%` }}>
            {`uploading image ${progress}%`}
          </div>
        </div>
      )}

      <button className="form-control btn-primary mt-4" onClick={handlePublish}>
        Publish
      </button>
    </div>
  );
};

export default AddPost