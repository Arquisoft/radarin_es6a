/* eslint-disable constructor-super */
import React from 'react';

import chatHelper from "./chatHelper";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { 
	Button
   } 
from "./locations.style";

type Props = {
	webId: String
};

class Chat extends React.Component {

	constructor({ webId }: Props) {
			super();
			this.webID = webId;
			this.handleShow= this.handleShow.bind(this);
			this.handleChange = this.handleChange.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
			this.locations_date = React.createRef();
			
			this.state = {
				data: [],
				original:[]
			};
		}
	  
	
		async handleShow(event) {

			let email = this.webID.replace("https://", "");
			email = email.replace(".solid.community/profile/card#me", "");
			email = email.replace("/profile/card#me", "");

			this._asyncRequest = chatHelper.getMessages(email, "Pepe").then((data) => {
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
		

			this._asyncRequest = chatHelper.sendMessages(email,"Pepe").then((message) => {
				this._asyncRequest = null;
				if (message.error && message.error!=undefined) {
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
			
			  <label>
				Mensaje:
				<input type="text" name="msn" />
			  </label>
			  
		

            <Button  type="submit" onClick={(e) => this.handleSubmit(e)}>
							Enviar mensaje
						</Button>

			<TableContainer component={Paper}>
						<Table aria-label="simple table">
						
							<TableBody>
									{this.state.data.length && this.state.data.map(m => {
										
											return (
												<TableRow>
													<TableCell align="center">{m.emisor}</TableCell>
													<TableCell align="center">{m.receptor}</TableCell>
													<TableCell align="center">{m.mensaje}</TableCell>
												
												</TableRow>
												
													)
												}
											)
										}
									
							</TableBody>
						</Table>
					</TableContainer>
			
			</div>
		  );
		}
	  }

export default Chat;
