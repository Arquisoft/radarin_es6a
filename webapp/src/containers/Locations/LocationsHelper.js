
class LocationsHelper {
	async getLocations(email, fecha) {
		const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
		console.log(apiEndPoint)
		let response = await fetch(apiEndPoint+'/locations/' + email + "/" + fecha)
		return await response.json()
	}
}
const locationsHelper = new LocationsHelper();

export default locationsHelper;
