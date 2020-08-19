import React from 'react';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import TelegramIcon from '@material-ui/icons/Telegram';

import './Header.css';

function Header() {
  return (
    <div className="header">
      <div>
        <CameraAltOutlinedIcon fontSize="large"/>
        <img className="hedaer__logo" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"/>
      </div><TelegramIcon fontSize="large"/>
    </div>
  );
}

export default Header;