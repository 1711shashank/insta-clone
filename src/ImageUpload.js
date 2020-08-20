import React from 'react';
import './ImageUpload.css';
import { useState, useImperativeHandle } from 'react';
import { Button } from '@material-ui/core';
import firebase from "firebase";
import { storage, db } from "./Firebase";


function ImageUpload({username}) {

    const [image,setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');
    const handleChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        
        uploadTask.on(
            "state_changed",
            (snapshort) => {
                //progress bar
                const progress = Math.round(
                    (snapshort.bytesTransferred / snapshort.totalBytes)*100
                );
                setProgress(progress);
            },
            (error) => {
                // Error function
                console.log(error);
                alert(error.message);
            },
            () => {
                //after upload complete....
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    //post image in db
                    db.collection("posts").add({
                        timestampe: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: username
                    });
                    setProgress(0);
                    setCaption("");
                    setImage(null);
                });
            }
        );
    }
  
  return (
    <div className="imageupload">
        {/* Caption Input */}
        {/* file picker */}
        {/* Post or submit button */}

        <progress className="imageupload__progress"  value={process} max="100"/>
        <input type="text" placeholder="Enter a caption..." onChange={event => setCaption(event.target.value)}  value={caption} />
        <input type="file" onChange={handleChange} />
        <Button onClick={handleUpload}> Upload  </Button>


    </div>
  );
}

export default ImageUpload;