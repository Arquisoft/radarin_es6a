import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usuariosHelper from "./UsuariosHelper";
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'

import { Header,
	 LocationsWrapper,
	 DivForms,
	 LabelInput,
	 TitleLocations,
	 Button,
	 LocationsForm,
	 ResultLocations ,
	 FormRenderContainer
	} 
from "./usuarios.style";

import i18n from "i18n";

function getData(callback) {
	var myRequest = usuariosHelper.getUsuarios();
	fetch(myRequest)
	  .then(results => {
		return results.json();
	  })
	  .then(callback);
  }

class Usuarios extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = { data: [] }
		this.newIdp = React.createRef();
		this.newUser = React.createRef();
	}

	componentDidMount() {
		const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
		var myRequest = new Request(apiEndPoint+'/users/list');
		
		fetch(myRequest)
		.then(response => response.json())
		.then(data => {
			console.log(data);
			this.setState({ data: data })
		})
	}

	handleSubmitAdd(event) {
		event.preventDefault();
		this.handleAdd(event);
		window.location.reload();
	}

	handleSubmitDelete(e, email) {
		e.preventDefault();
		console.log(email)
		if (email!==undefined) {
		
		
			console.log("Quiero borrar " + email);
			this.handleDelete(e,  email);
		} else {
			console.log("¿Dónde has pinchado ?", e.target)
		}
	}

	async handleAdd(event) {
		this._asyncRequest = usuariosHelper.addUser(this.newUser.current.value,
			 this.newIdp.current.value).then((data) => {
			this._asyncRequest = null;
			this.setState({
				data: data,
				original: data
			});
			console.log("this.state.data=" , this.state.data);
		});
		
		
}

	async handleDelete(event, email) {

		this._asyncRequest = usuariosHelper.deleteUsuarios(email).then((data) => {
			this._asyncRequest = null

			if (data.error && data.error!==undefined) {
				alert("ERROR:" + data.error);
			} else {
				console.log("Borrado correcto, respuesta=" , data);
				this.componentDidMount();
			}
		});
		
		
	}

	


	render() {
		
		return (

			<LocationsWrapper data-testid="locations-component">
				<Header data-testid="locations-header">
					<TitleLocations>Usuarios</TitleLocations>
						<LocationsForm id="locationsf">
							<DivForms>
									<LabelInput>
										Email (Ej: UOXXXXX)
										<input type="text" id="newUser" name="newUser" ref={this.newUser} />
									</LabelInput>
								
							</DivForms>
							<DivForms>
									<LabelInput>
										Idp (inrupt.net / solid.community.net)
										<input type="text" id="newIdp" name="newIdp" ref={this.newIdp} />
									</LabelInput>
								
							</DivForms>
						</LocationsForm>
					<DivForms>
						<Button id="add_user" form="addUser" type="submit" onClick={(e) => this.handleSubmitAdd(e)}>
							Añadir
						</Button>
					</DivForms>
				</Header>
				
				{this.getList()}
				
			</LocationsWrapper>

		);
	}

		getList() {
				return (
					<ResultLocations>

					<DivForms>
						<ul>
							{this.state.data.map(usuario => {
								return <li 
								name={`${usuario._id}`}>{usuario.email}&nbsp;
												<Button id="delete_user" form="deleteUser" type="submit" onClick={(e) => this.handleSubmitDelete(e, usuario.email)}>
								Delete
							</Button>
								</li>
							})}
						</ul>
					</DivForms>		
				</ResultLocations>
			);
		}

		
}

export default Usuarios;
