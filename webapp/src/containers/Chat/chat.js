import React, {useEffect, useState} from 'react';
import moment from 'moment';
import chatHelper from "./chatHelper";
//import MessageList from "./chat";


//import i18n from "i18n";
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





export function Message(props) {
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

export function MessageList(props) {
  const [messages, setMessages] = useState([])

  useEffect(() => {
 getMessages(props);

  },[])

  
  const getMessages= (props) => {
     var tempMessages = [
        //SACAR MENSAJES DE MONGODB esto es de prueba

        
        props
          
      ]
      setMessages([...messages, ...tempMessages])
  }

  const renderMessages = (webid) => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.author === webid;//=== MY_USER_ID;//OJO HAY QUE PONER EL WEB ID DEL USER
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
    

      <div className="message-list-container">{renderMessages("albaguerrero.inrupt.net")}</div>
      </div>);

}


type Props = {
	webId: String
};

class Chat extends React.Component {

  constructor({ webId }: Props) {
		super();
    this.webId=webId;
		this.chat = React.createRef();
    this.mensajes = React.createRef();
    this.handleShow= this.handleShow.bind(this);
    //this.handleSubmit= this.handleSubmit.bind(this);
    this.splitemail="Busca un usuario para empezar a chatear";

    this.state = {
			data: []
		};
  }
  


	componentWillUnmount() {}

  async  handleShow(event) {

    this.getName();

    let email = this.webId.replace("https://", "");
    email = email.replace(".solid.community/profile/card#me", "");
    email = email.replace("/profile/card#me", "");

    console.log("valor delusuario" +this.chat.current.value)


  this._asyncRequest = chatHelper.getMessages(email,this.chat.current.value).then((data) => {

    
      this._asyncRequest = null;

      this.setState({

          data: data

          

      });

      console.log("this.state.data=" , this.state.data);

  

          

  });
}

     getName(){
       
    if(this.chat!==null &&  this.chat !==undefined)
    this.splitemail=this.chat;
   
  
    return this.splitemail;
    }


async handleSubmit(event) {



    let email1 = this.webId.replace("https://", "");

    email1 = email1.replace(".solid.community/profile/card#me", "");

    email1 = email1.replace("/profile/card#me", "");



    this._asyncRequest = chatHelper.sendMessages(email1,this.chat.current.value,this.mensajes.current.value).then((message) => {

        this._asyncRequest = null;

        if (message.error && message.error!==undefined) {

            alert("ERROR:" + message.error);

        } else {

            console.log("Insertado correcto, respuesta=" , message);

        }

    });
  

//this.handleShow(event);

}

  
getList() {

  
  return(
   
  <div className="message-list">
        <TitleChat> {this.splitemail}</TitleChat>
      <div className="message-list-container"><MessageList {...this.data}> </MessageList></div>
      </div>

  
      );
}

getTyperBar(){

  return(
  
       <LabelInput>
								<input type="text" placeholder="Escribe un mensaje" id="mensaje" name="mensaje" ref={this.mensajes} />
						
						<Button id="send_message" form="form" type="submit" onClick={(e) => this.handleSubmit(e)} >Enviar
						</Button>
            </LabelInput>
          
       
      );

}
render() : React.ReactNode{
  return (
    <ChatWrapper data-testid="chat-component">
				<Header data-testid="chat-header">
					<TitleChat>{this.webId}</TitleChat>
					<ChatForm id="chatUser">
						<DivForms>
							<LabelInput>
								<input type="text" placeholder="Escribe un usuario" id="chat" name="chat" ref={this.chat} />
							</LabelInput>
						</DivForms>
						
					</ChatForm>
					<DivForms>
						<Button id="message" form="chatUser" type="submit" onClick={(e) => this.handleShow(e)} >Ir
						</Button>
					</DivForms>
				</Header>
        <MessageChat>
        {this.getList()}
        {this.getTyperBar()}

        </MessageChat>
        </ChatWrapper>
 

      
  );

};



} export default Chat;
