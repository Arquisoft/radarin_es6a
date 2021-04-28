/* eslint-disable constructor-super */
import React from 'react';
import chatHelper from "./chatHelper";
import i18n from "i18n";
import { 
	Header,
	 ChatWrapper,
	 DivForms,
	 LabelInput,
	 TitleChat,
	 Button,
	

   } 
from "./chat.style";
import './chat.css';
type Props = {
	webId: String
};

class Chat extends React.Component {
	
	constructor({ webId }: Props) {
			super();
			this.webID = webId;
			let email = this.webID.replace("https://", "");
			email = email.replace(".solid.community/profile/card#me", "");
			email = email.replace("/profile/card#me", "");
			this.webIduser = email;
			this.handleShow= this.handleShow.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
			this.message = React.createRef();
			this.user = React.createRef();
			
			this.state = {
				data: [],
				original:[]
			};
		}
	  
	
		async handleShow(event) {

			let email = this.webID.replace("https://", "");
			email = email.replace(".solid.community/profile/card#me", "");
			email = email.replace("/profile/card#me", "");

			this._asyncRequest = chatHelper.getMessages(email,this.user.current.value).then((data) => {
				this._asyncRequest = null;
				this.setState({
					data: data,
					original: data
				});
				console.log("this.state.data=" , this.state.data);
			});
			
			
	}
	  
		handleSubmit(event) {

			let email = this.webID.replace("https://", "");
			email = email.replace(".solid.community/profile/card#me", "");
			email = email.replace("/profile/card#me", "");
		  

			this._asyncRequest = chatHelper.sendMessages(email,this.user.current.value,this.message.current.value).then((message) => {
				this._asyncRequest = null;
				if (message.error && message.error!==undefined) {
					alert("ERROR:" + message.error);
				} else {
					console.log("Insertado correcto, respuesta=" , message);
				}
			});

			
			this.handleShow(event);


		}
	  
		render() {
		  return (
			  <div>
			
			
			  <ChatWrapper data-testid="chat-component">
                  <Header data-testid="chat-header">
                      <TitleChat></TitleChat>
                      <DivForms id="chatUser">
                          <DivForms>
                              <LabelInput>
                                  <input type="text" placeholder="Escribe un usuario" id="chat" name="chat" ref={this.user} />
                              </LabelInput>
                          </DivForms>
                          
                      </DivForms>
                      <DivForms>
                          <Button id="send_user" form="chatUser" type="submit" onClick={(e) => this.handleShow(e)} >Ir
                          </Button>
                      </DivForms>
					  <DivForms>
					  <LabelInput>
				Mensaje:
				<input type="text" id="msn" ref={this.message}/>
			  </LabelInput>
			  </DivForms>
		
			  <DivForms>
            <Button id="send_message"  type="submit" onClick={(e) => this.handleSubmit(e)}>
							Enviar mensaje
						</Button>
						</DivForms>
                  </Header>
				  
          <div>
		  {this.state.data.length && this.state.data.map(m => { 

			  if(m.emisor === this.webIduser ){
										
				return (
										
						<div>
							<div className ="message">
								<div className ="bubble-container">
        							<div className="bubble" title={m.emisor}>
          									{ m.mensaje }
        							</div>
      
								</div>
							</div>
						</div>
									

											
												)}
											}
										)}
          
  
          </div>


          </ChatWrapper>

		  
						
			
			</div>
		  );
		}
	  }

export default Chat;
