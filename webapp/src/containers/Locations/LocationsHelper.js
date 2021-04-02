
class LocationsHelper {
	async getLocations(email, fecha) {
		const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
		console.log(apiEndPoint)
		let response = await fetch(apiEndPoint+'/locations/' + email + "/" + fecha)
		return await response.json()
	}

	async deleteLocations(id) {
		const requestOptions = {
			method: 'DELETE'
		  };
		const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
		console.log(apiEndPoint + " " + id)
		let response = await fetch(apiEndPoint+'/locations/delete' + "/" + id, requestOptions)
		return await response.json()
	}
}
const locationsHelper = new LocationsHelper();

export default locationsHelper;
