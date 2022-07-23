import React from 'react'
import { StreamChat } from 'stream-chat'
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelContainer, UserListContainer, Authorize} from './components';
import './App.css';

const cookies = new Cookies();



const client = StreamChat.getInstance("w5gdfngq7ykr");
//Variable will be available if logged in
const authorizeToken = cookies.get("token");
//connect the user
if(authorizeToken) {
  client.connectUser({
    name: cookies.get('username'),
    id: cookies.get('userId'),
    hashedPassword: cookies.get('hashedPassword'),
  }, authorizeToken)
}

const App = () => {
  if(!authorizeToken) return <Authorize />

  return (
    <div className="app__container">
        <Chat client={client} theme="team dark">
            <UserListContainer 
            
            />
            <ChannelContainer 
            
            />
        </Chat>
    </div>
  );
}

export default App;