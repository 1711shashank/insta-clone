import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import './Post.css';

function Post( {username, caption, imageUrl}) {
  return (
    <div className="post">
      <div className="post__header"> 
        <Avatar
            className="post__avatar"
            src="https://1711shashank.github.io/web-page/images/Profile.jpg"
            alt="Profile Pic"
        />
        <p>{username}</p>
      </div>
      
      <img
        className="post__image"
        src={imageUrl}
      />
      <p className="post__text"><span>{username} </span>{caption}</p>
      </div>
  );
}

export default Post;