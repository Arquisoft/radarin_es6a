/* eslint-disable constructor-super */
import React from 'react';
import chatHelper from "./chatHelper";

import {
	Header,
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
var funcion;
class Chat extends React.Component {

	constructor({ webId }: Props) {
		super();
		this.webID = webId;
		let email = this.webID.replace("https://", "");
		email = email.replace(".solid.community/profile/card#me", "");
		email = email.replace("/profile/card#me", "");
		this.webIduser = email;
		this.handleShow = this.handleShow.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.message = React.createRef();
		this.user = React.createRef();

		this.state = {
			data: [],
			original: [],

		};
	}

	componentWillUnmount() {

		clearInterval(funcion);

	}

	async startChat() {

		if (funcion != null) {

			clearInterval(funcion);
		}

		this.handleShow();

		funcion = setInterval(this.handleShow, 2000);

	}

	async handleShow() {

		let email = this.webID.replace("https://", "");
		email = email.replace(".solid.community/profile/card#me", "");
		email = email.replace("/profile/card#me", "");

		this._asyncRequest = chatHelper.getMessages(email, this.user.current.value).then((data) => {
			this._asyncRequest = null;
			this.setState({
				data: data,
				original: data
			});
			console.log("this.state.data=", this.state.data);
		});


	}

	handleSubmit() {

		let email = this.webID.replace("https://", "");
		email = email.replace(".solid.community/profile/card#me", "");
		email = email.replace("/profile/card#me", "");


		this._asyncRequest = chatHelper.sendMessages(email, this.user.current.value, this.message.current.value).then((message) => {
			this._asyncRequest = null;
			if (message.error && message.error !== undefined) {
				alert("ERROR:" + message.error);
			} else {
				console.log("Insertado correcto, respuesta=", message);
			}
		});


		this.handleShow();


	}

	render() {
		return (

			<div className="container">
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
						<Button id="send_user" form="chatUser" type="submit" onClick={(e) => this.startChat()} >Chat
					  </Button>
					</DivForms>

				</Header>
				<div className="chat">


					<div className="message">

						{this.state.data.map(m => {

							if (m.emisor === this.webIduser) {

								return (

									<div className="bubble-container">
										<div className="bubbleEmisor" >
											{m.mensaje}
										</div>
									</div>





								)
							}

							else {

								return (



									<div className="bubble-container">
										<div className="bubbleReceptor" >
											{m.mensaje}
										</div>


									</div>




								)

							}
						}
						)}

					</div>
					<div className="send">



						<input class="inputsend" type="text" id="msn" ref={this.message} />




						<Button type="submit" onClick={(e) => this.handleSubmit()}>
							Send
						</Button>

					</div>



				</div>

			</div>


		);
	}
}

export default Chat;
