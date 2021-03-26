import React from "react";
import { Loader } from "@util-components";
import { errorToaster, successToaster } from "@utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import locationsHelper from "./LocationsHelper";

import { Header,
	 LocationsWrapper, TextArea, DivForms, LabelInput, TitleLocations, Button, LocationsForm, ResultLocations } from "./locations.style";

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

	componentDidMount() {
		
		/* let email = this.webID.replace("https://", "");
		email = email.replace(".solid.community/profile/card#me", "");
		email = email.replace("/profile/card#me", "");

		this._asyncRequest = locationsHelper.getLocations(email).then((data) => {
			this._asyncRequest = null;
			this.setState({
				data: data,
				original: data
			});
			console.log("this.state.data=" , this.state.data);
		}); */
		
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

			this._asyncRequest = locationsHelper.getLocations(email).then((data) => {
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
						{/* <MultimediaComponent id="input-img" webId={`[${this.webId}]`} image="" /> */}
						<hr />
						<Button id="search_locations" form="locationsf" type="submit" onClick={(e) => this.handleSubmit(e)}>
							<FontAwesomeIcon icon="street-view" className="street-view" title={i18n.t("locations.btnLocations")} />
							{"	" + i18n.t("locations.btnLocations")}
						</Button>
					</DivForms>
				</Header>
{/* 
				<Map parentCallBack={this.callBackFunction} zoom={13} /> */}
				<ResultLocations>
					<div>
						<ul>
						{ this.state.data.length && this.state.data.map(m => 
						<li key={m._id}>{m.longitud} - {m.latitud} - {m.fecha} </li>) }
		
						</ul>
					</div>
					
				 </ResultLocations>
			</LocationsWrapper>
		);
	}
}

export default Locations;
