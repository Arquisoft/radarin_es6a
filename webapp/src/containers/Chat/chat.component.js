import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import Toolbar from '@material-ui/core/Toolbar';

import ChatIcon from '@material-ui/icons/Chat';
import FaceIcon from '@material-ui/icons/Face';


type Props = {
  webId: String
};

class Chat extends React.Component {
  constructor({ webId }: Props) {
    super();
    this.webID = webId;

    this.state = {
      chat: [],
      content: '',
      name: ''
    };
  }



   metodo(){ 
   <AppBar position = "fixed" className = { classes.appBar } >
      <Toolbar>
        <div className={classes.inputContainer} style={{ maxWidth: '200px' }}>
          <div className={classes.icon}>
            <FaceIcon />
          </div>
          <InputBase
            onChange={props.handleName}
            value={props.name}
            placeholder="Name"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'name' }}
          />
        </div>
        <div className={classes.inputContainer}>
          <form onSubmit={props.handleSubmit}>
            <div className={classes.icon}>
              <ChatIcon />
            </div>
            <InputBase
              onChange={props.handleContent}
              value={props.content}
              placeholder="Type your message..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'content' }}
            />
          </form>
        </div>
      </Toolbar>
    </AppBar>
  
            }


componentDidMount() {
  this.socket = io(config[process.env.NODE_ENV].endpoint);

  // Load the last 10 messages in the window.
  this.socket.on('init', (msg) => {
    let msgReversed = msg.reverse();
    this.setState((state) => ({
      chat: [...state.chat, ...msgReversed],
    }), this.scrollToBottom);
  });

  // Update the chat if a new message is broadcasted.
  this.socket.on('push', (msg) => {
    this.setState((state) => ({
      chat: [...state.chat, msg],
    }), this.scrollToBottom);
  });
}

// Save the message the user is typing in the input field.
handleContent(event) {
  this.setState({
    content: event.target.value,
  });
}

//
handleName(event) {
  this.setState({
    name: event.target.value,
  });
}

handleSubmit(event) {
  // Prevent the form to reload the current page.
  event.preventDefault();
  handleShow(event);
  // Send the new message to the server.
 // this.socket.emit('message', {
   
}

  async handleShow(event) {
  
    let name = this.webID.replace("https://", "");
    name = name.replace(".solid.community/profile/card#me", "");
    name = name.replace("/profile/card#me", "");

    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
		console.log(apiEndPoint)
	//	let response = await fetch(apiEndPoint+'/chat/' + email + "/" + fecha)
		return await response.json()
    
    
    
}

  this.setState((state) => {
    // Update the chat with the user's message and remove the current message.
    return {
      chat: [...state.chat, {
        name: state.name,
        content: state.content,
      }],
      content: '',
    };
  }, this.scrollToBottom);


// Always make sure the window is scrolled down to the last message.
scrollToBottom() {
  const chat = document.getElementById('chat');
  chat.scrollTop = chat.scrollHeight;
}

render() {
  return (

    <div className="App">
      <Paper id="chat" elevation={3}>
        {this.state.chat.map((el, index) => {
          return (
            <div key={index}>
              <Typography variant="caption" className="name">
                {el.name}
              </Typography>
              <Typography variant="body1" className="content">
                {el.content}
              </Typography>
            </div>
          );
        })}
      </Paper>
      <BottomBar
        content={this.state.content}
        handleContent={this.handleContent.bind(this)}
        handleName={this.handleName.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
        name={this.state.name}
      />
    </div>
  );

};

export default function chatComponent(props) {
  const classes = useStyles();
}
  export default chatComponent;
