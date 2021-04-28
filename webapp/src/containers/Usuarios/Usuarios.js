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


type Props = {
	webId: String
};

class Usuarios extends React.Component {
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

	componentWillUnmount() {}
	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	handleSubmit() {
		//event.preventDefault();
		this.handleShow();
	}

	async handleShow() {

			this._asyncRequest = usuariosHelper.getUsuarios().then((data) => {
				this._asyncRequest = null;
				this.setState({
					data: data,
					original: data
				});
				console.log("this.state.data=" , this.state.data);
			});
			
			
	}

		
	render(): React.ReactNode {
		return (
			<LocationsWrapper>
			<ResultLocations>
					<FormRenderContainer id="empty">
						<h5 align="center">
							{this.handleSubmit()}
						</h5>
						
					</FormRenderContainer>	
			</ResultLocations>
			</LocationsWrapper>
		);
	}

}

export default Usuarios;
