import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import locationsHelper from "./LocationsHelper";
import ReactTable from 'react-table-v6';
//import 'react-table-v6/react-table.css';
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
from "./locations.style";
import i18n from "i18n";


type Props = {
	webId: String
};

class Locations extends React.Component {
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

	handleSubmit(event) {
		event.preventDefault();
		this.handleShow(event);
	}

	handleSubmitDelete(e) {
		e.preventDefault();
		let id = e.target.value;
		if (id === undefined) {
			id = e.target.parentNode.value;
		}
		if (id!==undefined) {
		
		
			console.log("Quiero borrar " + id);
			this.handleDelete(e,  id);
			this.handleShow(null);
		} else {
			console.log("¿Dónde has pinchado ?", e.target)
		}
	}

	async handleShow(event) {

			let email = this.webID.replace("https://", "");
			email = email.replace(".solid.community/profile/card#me", "");
			email = email.replace("/profile/card#me", "");

			this._asyncRequest = locationsHelper.getLocations(email, this.locations_date.current.value).then((data) => {
				this._asyncRequest = null;
				this.setState({
					data: data,
					original: data
				});
				console.log("this.state.data=" , this.state.data);
			});
			
			
	}

	async handleDelete(event, id) {

		this._asyncRequest = locationsHelper.deleteLocations(id).then((data) => {
			this._asyncRequest = null

			if (data.error && data.error!==undefined) {
				alert("ERROR:" + data.error);
			} else {
				console.log("Borrado correcto, respuesta=" , data);
			}
		});
		
		
	}

		
	render(): React.ReactNode {
		return (
			<LocationsWrapper data-testid="locations-component">
				<Header data-testid="locations-header">
					<TitleLocations>{i18n.t("locations.title")}</TitleLocations>
					<LocationsForm id="locationsf">
						<DivForms>
							<LabelInput>
								{i18n.t("locations.date")}
								<input type="text" id="locations_date" name="locations_date" ref={this.locations_date} />
							</LabelInput>
						</DivForms>
						
					</LocationsForm>
					<DivForms>
						<Button id="search_locations" form="locationsf" type="submit" onClick={(e) => this.handleSubmit(e)}>
							<FontAwesomeIcon icon="street-view" className="street-view" title={i18n.t("locations.btnLocations")} />
							{"	" + i18n.t("locations.btnLocations")}
						</Button>
					</DivForms>
				</Header>

				
				{this.getList()}
				
			</LocationsWrapper>
		);
	}

	getList() {
		if (this.state.data !== null && this.state.data.length > 0) {
			let headerLongitud = i18n.t("locations.longitud");
			let headerLatitud = i18n.t("locations.latitud");
			let headerFecha = i18n.t("locations.fecha");
			let headerVacia = "";
			let rows = [];
			this.state.data.forEach(m => {
				rows.push(
					{
						longitud: m.longitud,
						latitud: m.latitud,
						fecha: m.fecha,
						eliminar: m._id  
					}
					);
			});
			

			let columns = [
				{
				Header:  headerLongitud ,
				accessor: 'longitud'
			  	},
				{
				Header:  headerLatitud ,
				accessor: 'latitud'
				},
				{
				Header:  headerFecha ,
				accessor: 'fecha'
				},
				{
				Header:  headerVacia ,
				accessor: 'eliminar',
				Cell: props => <Button id='delete_location' value={props.value} type='submit' onClick={(e) => this.handleSubmitDelete(e)}  ><FontAwesomeIcon icon='backspace' className='backspace' /></Button> 
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
							{i18n.t("locations.noLocations")}
						</h5>
						
					</FormRenderContainer>	
				</ResultLocations>
			);
		}
	}
}

export default Locations;
