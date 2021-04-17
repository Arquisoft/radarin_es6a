/* eslint-disable constructor-super */
import React from 'react';
import chatHelper from "./chatHelper";
import md5 from 'md5';
import ReverseMd5 from 'reverse-md5';

import { 
	Button
   } 
from "./chat.style";

type Props = {
	webId: String
};

class Chat extends React.Component {
	
	constructor({ webId }: Props) {
			super();
			this.webID = webId;
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

		//	let message_md5 = md5(this.message)
		
		//	console.log(message_md5);

			this._asyncRequest = chatHelper.sendMessages(email,this.user.current.value,this.message.current.value).then((message) => {
				this._asyncRequest = null;
				if (message.error && message.error!=undefined) {
					alert("ERROR:" + message.error);
				} else {
					console.log("Insertado correcto, respuesta=" , message);
				}
			});

			


		}
	  
		render() {
		  return (
			  <div>
			
			  <label>
				Mensaje:
				<input type="text" id="msn" ref={this.message}/>
			  </label>

			  <label>
				Enviar a:
				<input type="text" id="user" ref={this.user}/>
			  </label>
			  
		

            <Button  type="submit" onClick={(e) => this.handleSubmit(e)}>
							Enviar mensaje
						</Button>
						

						<Button  type="submit" onClick={(e) => this.handleShow(e)}>
							Mostrar mensajes
						</Button>
							
									{this.state.data.length && this.state.data.map(m => {
										
											return (
												<div>
													<div align="center">{m.emisor} </div>
													<div align="center">{m.receptor}</div>
													<div align="center">{m.mensaje}</div>
												
												</div>
												
													)
												}
											)
										}
									
		
			
			</div>
		  );
		}
	  }

export default Chat;
