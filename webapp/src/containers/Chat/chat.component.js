/* eslint-disable constructor-super */
import React from 'react';
import { documentExists } from '../../utils/ldflex-helper';
import chatHelper from "./chatHelper";

class Chat extends React.Component {

		constructor(props) {
		  super(props);
		  this.state = {msn: ''};
		  this.messages = [];
	  
		  this.handleChange = this.handleChange.bind(this);
		  this.handleSubmit = this.handleSubmit.bind(this);
		}
	  
		handleChange(event) {
		  this.setState({msn: event.target.msn});
		}
		async handleShow(event,email2) {

			let email = this.webID.replace("https://", "");
			email = email.replace(".solid.community/profile/card#me", "");
			email = email.replace("/profile/card#me", "");

			this._asyncRequest = chatHelper.getMessages(email, email2).then((data) => {
				this._asyncRequest = null;
				this.setState({
					data: data,
					original: data
				});
				console.log("this.state.data=" , this.state.data);
			});
			
			
	}
	  
		handleSubmit(event,email1,email2) {


			this.messages.push(this.state.msn)

			document.getElementById("men").innerHTML = this.state.msn

			this._asyncRequest = chatHelper.sendMessages(email1,email2).then((message) => {
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
			<form onSubmit={this.handleSubmit}>
			  <label>
				Mensaje:
				<input type="text" value={this.state.msn} onChange={this.handleChange} />
			  </label>
			  <input type="submit" value="Submit" />
			</form>

            <div id="men">

			</div>
			
			</div>
		  );
		}
	  }

export default Chat;
