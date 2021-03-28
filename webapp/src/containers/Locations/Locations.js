import React from "react";
import { Loader } from "@util-components";
import { errorToaster, successToaster } from "@utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import locationsHelper from "./LocationsHelper";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Header,
	 LocationsWrapper,
	 TextArea,
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
		
	render(): React.ReactNode {
		
		return (
			<LocationsWrapper data-testid="locations-component">
				<Header data-testid="locations-header">
					<TitleLocations>{i18n.t("locations.title")}</TitleLocations>
					<LocationsForm id="locationsf">
						<DivForms>
							<LabelInput>
								{i18n.t("locations.date")}{" "}
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
				return (
				<ResultLocations>
					<TableContainer component={Paper}>
						<Table aria-label="simple table">
							<TableHead>
							<TableRow>
								<TableCell align="center">{i18n.t("locations.longitud")}</TableCell>
								<TableCell align="center">{i18n.t("locations.latitud")}</TableCell>
								<TableCell align="center">{i18n.t("locations.fecha")}</TableCell>
							</TableRow>
							</TableHead>
							<TableBody>
									{this.state.data.length && this.state.data.map(m => {
										if(this.state.data.length > 0) {
											return (
												<TableRow>
													<TableCell align="center">{m.longitud}</TableCell>
													<TableCell align="center">{m.latitud}</TableCell>
													<TableCell align="center">{m.fecha}</TableCell>
												</TableRow>
												
													)} else{
														return (<TableRow>
															<TableCell align="center">{m.longitud}</TableCell>
														</TableRow>);
													}
												}
											)
										}
									
							</TableBody>
						</Table>
					</TableContainer>
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
