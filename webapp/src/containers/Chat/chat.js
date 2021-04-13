
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import Toolbar from '@material-ui/core/Toolbar';

import i18n from "i18n";
import {
  ChatInputContainer,
  ChatIconStyle,
  ChatInputInput,
  Header,
	 ChatWrapper,
	 TextArea,
	 DivForms,
	 LabelInput,
	 TitleChat,
	 Button,
	ChatForm,
	 ResultLocations ,
	 FormRenderContainer
  
 } 
from "./chat.style";
function Message(props) {
  const {
    data,
    isMine,
    startsSequence,
    endsSequence,
    showTimestamp
  } = props;

  const friendlyTimestamp = moment(data.timestamp).format('LLLL');
  return (
    <div className={[
      'message',
      `${isMine ? 'mine' : ''}`,
      `${startsSequence ? 'start' : ''}`,
      `${endsSequence ? 'end' : ''}`
    ].join(' ')}>
      {
        showTimestamp &&
          <div className="timestamp">
            { friendlyTimestamp }
          </div>
      }

      <div className="bubble-container">
        <div className="bubble" title={friendlyTimestamp}>
          { data.message }
        </div>
      </div>
    </div>
  );
}
 
class Chat extends React.Component {
//const MY_USER_ID = webId;

    
  MessageList(props) {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    getMessages();
  },[])

  
  const getMessages = () => {
     var tempMessages = [
        //SACAR MENSAJES DE MONGODB esto es de prueba

        {
            id: 1,
            author: 'apple',
            message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
            timestamp: new Date().getTime()
          },
          {
            id: 2,
            author: 'orange',
            message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
            timestamp: new Date().getTime()
          },
      ]
      setMessages([...messages, ...tempMessages])
  }
  
    const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.author ;//=== MY_USER_ID
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;
        
        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  }
  }
getList() {
  return(
  <div className="message-list">
        <h1 className="toolbar-title"  > webid2</h1> 
      <div className="message-list-container">{renderMessages()}</div>
      </div>
      );
};

render() : React.ReactNode{
  return (
    <ChatWrapper data-testid="chat-component">
				<Header data-testid="chat-header">
					<TitleChat>{i18n.t("chat.webid2")}</TitleChat>
					<ChatForm id="chatUser">
						<DivForms>
							<LabelInput>
								<input type="text" id="chat" name="chat.user" ref={this.locations_date} />
							</LabelInput>
						</DivForms>
						
					</ChatForm>
					<DivForms>
						<Button id="send_message" form="chatUser" type="submit" onClick={(e) => this.handleSubmit(e)}>
						</Button>
					</DivForms>
				</Header>
        {this.getList()}
        </ChatWrapper>


      
  );

};



} export default Chat;
