import React, { useState,useEffect } from 'react';

import {db, auth} from './Firebase';
import './App.css';
import Post from './Post';
import ImageUpload from './ImageUpload';
import Modal from '@material-ui/core/Modal';
import InstagramEmbed from 'react-instagram-embed';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;


  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [posts,setPosts] = useState([]);
  const [open,setOpen] = useState(false);
  
  const [openlogIn,setopenlogIn] = useState('');
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [user,setUser] = useState(null);

  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){ 
        //user has logged in...
        console.log(authUser);
        setUser(authUser);  //after refrese you still login

      } else {
        //user has loggged out..
        setUser(null);       
      }
    })
    return () => {
      //perform some cleanup action
      unsubscribe();
    }  
  },[user,username]);


  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ( {
        id:doc.id,
        post:doc.data()
      })));
    })    
  },[]);

  const signUp = (event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName:username
      })
    })
    .catch((error) => alert(error.message))

    setOpen(false);    //close the signup pop-up window
  }
  const logIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email,password)
      .catch((error) => alert(error.message))

      setopenlogIn(false);   //close the login pop-up window

  }


  return (
    <div className="App">
    
    {/* Caption Input */}
    {/* file picker */}
    {/* Post or submit button */}

      <Modal
        open={openlogIn}
        onClose={() => setopenlogIn(false)}
      >
      <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
          <center>
            <img
              className="app__headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="insta logo"
            />
          </center>
          <Input
              placeholder='email'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
          <Input
              placeholder='password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" onClick={logIn}>Sign Up</Button>
        </form>

    </div>
      </Modal>     
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
          <center>
            <img
              className="app__headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="insta logo"
            />
          </center>
          <Input
              placeholder='username'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
          />
          <Input
              placeholder='email'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
          <Input
              placeholder='password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" onClick={signUp}>Sign Up</Button>
        </form>

    </div>
      </Modal>
      
      <div className="app__header">
        <img className="hedaer__logo" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"/>
        <div className="login__bar">
          {
            user ? (
              <Button onClick={ () => auth.signOut()}>Log Out</Button>
            ) : (
              <div className="app__loginContainer">
                <Button onClick={ () => setopenlogIn(true)}>Log In</Button>
                <Button onClick={ () => setOpen(true)}>Sign Up</Button>
              </div>
              )
          }
        </div>
      </div>
      <div className="app__uploadBar">
        {
          user ? (
            <ImageUpload username={username} />

          ) : (
            <p> Please Log in to Uplode</p>

          )
        }
      </div>
       
      <div className="app__posts">
        <div className="app__postsLeft">
        {
          posts.map( ({id, post}) => (
            <Post 
              key={id}
              postId={id}
              user={user}
              username={post.username} 
              caption={post.caption} 
              imageUrl={post.imageUrl}
            />
          ))
        }     
      </div>
      <div className="app__postsRight">
        {/* <InstagramEmbed
            url='https://www.instagram.com/p/CEB8527DKVa/?igshid=95ztm0cd9yrx'
            maxWidth={50}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          /> */}
       </div>
      </div>
      
    </div>
  );
}

export default App;
