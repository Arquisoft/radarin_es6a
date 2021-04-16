import React, {useEffect, useState} from 'react';
import moment from 'moment';
import chatHelper from "./chatHelper";


import i18n from "i18n";
import {
  
  Header,
	 ChatWrapper,
	 DivForms,
	 LabelInput,
	 TitleChat,
	 Button,
	ChatForm,
  MessageChat

  
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

  function MessageList(props) {
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
            message: 'Esto es una pruebaaaa del chat para RADARIN 6A',
            timestamp: new Date().getTime()
          },
          {
            id: 2,
            author: 'orange',
            message: 'Holaaa!',
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
      let isMine = current.author ==="apple";//=== MY_USER_ID;//OJO HAY QUE PONER EL WEB ID DEL USER
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

  return(
    <div className="message-list">
    

      <div className="message-list-container">{renderMessages()}</div>
      </div>);

}

type Props = {
	webId: String
};

class Chat extends React.Component {

  constructor({ webId }: Props) {
		super();
	
		this.chat = React.createRef();
    this.handleShow= this.handleShow.bind(this);

    this.state = {
			data: []
		};
  }




async  handleShow(event) {



  let email = this.webID.replace("https://", "");

  email = email.replace(".solid.community/profile/card#me", "");

  email = email.replace("/profile/card#me", "");



  this._asyncRequest = chatHelper.getMessages(email, this.chat.current.value).then((data) => {

    
      this._asyncRequest = null;

      this.setState({

          data: data

          

      });

      console.log("this.state.data=" , this.state.data);

  

          

  });
}

    


handleSubmit(event) {

    

    let email1 = this.webID.replace("https://", "");

    email1 = email1.replace(".solid.community/profile/card#me", "");

    email1 = email1.replace("/profile/card#me", "");



    this._asyncRequest = chatHelper.sendMessages(email1,this.chat).then((message) => {

        this._asyncRequest = null;

        if (message.error && message.error!==undefined) {

            alert("ERROR:" + message.error);

        } else {

            console.log("Insertado correcto, respuesta=" , message);

        }

    });
  



}

  
getList(nombre) {
  return(
   
  <div className="message-list">
        <TitleChat> <h1 className="toolbar-title"  > {nombre}</h1> </TitleChat>
      <div className="message-list-container"><MessageList> </MessageList></div>
      </div>

  
      );
}

getTyperBar(){

  return(
      <div className="escribe">
        <input
          type="text"
          placeholder="Escribe un mensaje"
        />
       
</div>
      );

}
render() : React.ReactNode{
  return (
    <ChatWrapper data-testid="chat-component">
				<Header data-testid="chat-header">
					<TitleChat>{i18n.t("chat.webid2")}</TitleChat>
					<ChatForm id="chatUser">
						<DivForms>
							<LabelInput>
								<input type="text" placeholder="Escribe un usuario" id="chat" name="chat" ref={this.chat} />
							</LabelInput>
						</DivForms>
						
					</ChatForm>
					<DivForms>
						<Button id="send_message" form="chatUser" type="submit" onClick={(e) => this.handleSubmit(e)} >Ir
						</Button>
					</DivForms>
				</Header>
        <MessageChat>
        {this.getList("webid2")}
        {this.getTyperBar()}

        </MessageChat>
        </ChatWrapper>
 //PASAR AQUI EL WEB ID

      
  );

};



} export default Chat;
