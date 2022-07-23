import React from 'react'
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';



import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import Avatar from '../assets/avatar.jpeg'
import Logout from '../assets/logout.png'


const SideBar = ({ logout }) => (
  <div className="sidebar">
      <div className="icon_set1">
          <div className="set1__inner">
              <img src={Avatar} alt="Avatar" width="70" />
          </div>
      </div>
      <div className="sidebar__logout">
          <div className="set2__inner" onClick={logout}>
              <img src={Logout} alt="Logout" width="40" />
          </div>
      </div>
  </div>
);

const UserListContainer = () => {
  return (
    <>
      <SideBar />
    </>
  )
}

export default UserListContainer;