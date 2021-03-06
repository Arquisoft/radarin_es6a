import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usersHelper from "./UsersHelper";
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import auth from "solid-auth-client";

import { Header,
	 LocationsWrapper,
	 DivForms,
	 LabelInput,
	 TitleLocations,
	 Button,
	 LocationsForm,
	 ResultLocations,
	 FormRenderContainer
	} 
from "./users.style";

import i18n from "i18n";

class Users extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = { data: [] }
		this.newIdp = React.createRef();
		this.newUser = React.createRef();
		this.email = "";
		this.users = [];
		this.isAdmin = false;
	}

	componentDidMount() {
		const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
		var myRequest = new Request(apiEndPoint+'/users/list');
		
		fetch(myRequest)
		.then(response => response.json())
		.then(data => {
			this.users = data;
			console.log(this.users);
			this.setState({ data: data })
		})
	}

	handleSubmitAdd(event) {
		event.preventDefault();
		this.handleAdd(event);
		window.location.reload();
	}

	handleSubmitDelete(e) {
		e.preventDefault();
		let id = e.target.value;
		console.log(id)
		if (id!==undefined) {
			
		
			console.log("Quiero borrar " + id);
			this.handleDelete(e,  id);
		} else {
			console.log("¿Dónde has pinchado ?", e.target)
		}
	}




	async handleAdd(event) {
		this._asyncRequest = usersHelper.addUser(this.newUser.current.value,
			 this.newIdp.current.value).then((data) => {
			this._asyncRequest = null;
			this.setState({
				data: data,
				original: data
			});
			console.log("this.state.data=" , this.state.data);
		});
		
		
}

	async handleDelete(event, id) {

		this._asyncRequest = usersHelper.deleteUsers(id).then((data) => {
			this._asyncRequest = null

			if (data.error && data.error!==undefined) {
				alert("ERROR:" + data.error);
			} else {
				console.log("Borrado correcto, respuesta=" , data);
				this.componentDidMount();
			}
		});
		
		
	}

	async getName() {
		await auth.trackSession((session) => {
			if (!session) {
			  return;
			} else {
			  this.webId = session.webId;
			}
		  });
		return this.webId;
	}

	render() {

		this._asyncRequest = this.getName().then((data) => {
			
			this.email = data.replace("https://", "");
			this.email = this.email.replace("/profile/card#me", "");

		});
		
		this.users.forEach(m => {
			if(this.email === m.webID && m.admin){
				this.isAdmin = true;
			}
		});
				
		if(this.isAdmin) {

			return (

				<LocationsWrapper data-testid="locations-component">
					<Header data-testid="locations-header">
						<TitleLocations>{i18n.t("usuarios.usuarios")}</TitleLocations>
							<LocationsForm id="locationsf">
								<DivForms>
										<LabelInput>
											{i18n.t("usuarios.email")}
											<input type="text" id="newUser" name="newUser" ref={this.newUser} />
										</LabelInput>
									
								</DivForms>
								<DivForms>
										<LabelInput>
										{i18n.t("usuarios.idp")}
											<input type="text" id="newIdp" name="newIdp" ref={this.newIdp} />
										</LabelInput>
									
								</DivForms>
							</LocationsForm>
						<DivForms>
							<Button id="add_user" form="addUser" type="submit" onClick={(e) => this.handleSubmitAdd(e)}>
							{i18n.t("usuarios.add")}
							</Button>
						</DivForms>
					</Header>
					
					{this.getList()}
					
				</LocationsWrapper>

			);
		} else {
			return (
				<ResultLocations>
					<FormRenderContainer id="empty">
						<h5 align="center">
							{i18n.t("usuarios.accesoNoPermitido")}
						</h5>
						
					</FormRenderContainer>	
				</ResultLocations>
			);
		}
	}

		getList() {
			if (this.state.data !== null && this.state.data.length > 0) {
				let headerEmail = "Email";
				let headerVacia = "";

				let rows = [];
				this.state.data.forEach(m => {
						
				rows.push(
					{
						email : m.email,
						eliminar : m._id
					}
				);
				});

				let columns = [
					{
					Header:  headerEmail ,
					accessor: 'email'
					},
					{
						Header:  headerVacia ,
						accessor: 'eliminar',
						Cell: props => <Button id='delete_usuario' value={props.value} type='submit' onClick={(e) => this.handleSubmitDelete(e)}  ><FontAwesomeIcon icon='backspace' className='backspace' /></Button> 
					}
				];

				return (
					<ResultLocations>
						<ReactTable
							data={rows}
							columns={columns}
						/>
						
	
					</ResultLocations>
				);
			} else {
				return (
					<ResultLocations>
						<FormRenderContainer id="empty">
							<h5 align="center">
								{i18n.t("users.noUsuarios")}
							</h5>
							
						</FormRenderContainer>	
					</ResultLocations>
				);
			}

		}

		
}

export default Users;