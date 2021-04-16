
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import chatHelper from "./chatHelper"

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
class Chat extends React.Component {

    constructor({ webId }: Props) {
          super();
      
          this.chat = React.createRef();
  
      this.state = {
              data: []
          };
    }
  
  
    
  
  
  
  handleSubmit(event) {
  
      
  
      let email1 = this.webID.replace("https://", "");
  
      email1 = email1.replace(".solid.community/profile/card#me", "");
  
      email1 = email1.replace("/profile/card#me", "");
  
  
  
      this._asyncRequest = chatHelper.sendMessages(email1,this.chat).then((message) => {
  
          this._asyncRequest = null;
  
          if (message.error && message.error!=undefined) {
  
              alert("ERROR:" + message.error);
  
          } else {
  
              console.log("Insertado correcto, respuesta=" , message);
  
          }
  
      });
    
  
  
  
  }
  
    
  getList(nombre) {
    return(
     
    <div className="message-list">
        
        <div className="message-list-container"><MessageList> </MessageList></div>
        </div>
  
    
        );
  };
  
  getTyperBar(){
  
    return(
        <div className="escribe">
          <input
            type="text" id="msn"
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
          {this.getList(this.chat)}
          {this.getTyperBar()}
  
          </MessageChat>
          </ChatWrapper>
   //PASAR AQUI EL WEB ID
  
        
    );
  
  };
  
  
  
  } export default Chat;
  