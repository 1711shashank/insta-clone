import React, { useState,  useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import './Post.css';
import firebase from "firebase";
import { db, storage } from './Firebase';

function Post( {postId, user, username, caption, imageUrl}) {

  const [comments,setComments] = useState([]);
  const [comment,setComment] = useState('');
  const postComment = (event) => {
    event.preventDefault();

    db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ 
            text: comment, 
            username: user.displayName,
            timestampe: firebase.firestore.FieldValue.serverTimestamp() 
      });
    setComment('')
     
  }
  
  useEffect(() => {
    let unsubscribe;
    if(postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  
  return (
    <div className="post">
      <div className="post__header"> 
        <Avatar
            className="post__avatar"
            src=""
            alt="Profile Pic"
        />
        <p>{username}</p>
      </div>
      
      <img className="post__image" src={imageUrl} />
      <p className="post__text"><span>{username} </span>{caption}</p>
      <div className="post__comments">
        { comments.map((comment) => (
          <p>
            <span>{comment.username}</span> {comment.text}
          </p>
        ))}
      </div>
      {user && (
        <form className="post__commentBox">
        <input
          className="post__input"
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange = {(e) => setComment(e.target.value)}
        />
        <button 
          className="post__button"
          disabled={!comment}
          type="submit"
          onClick={postComment}

        > Post </button>
      </form>
      )}

      
    </div>
  );
}

export default Post;