
class LocationsHelper {
	async getLocations(email) {
		const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
		console.log(apiEndPoint)
		let response = await fetch(apiEndPoint+'/locations/' + email)
		return await response.json()
	}
}
const locationsHelper = new LocationsHelper();

export default locationsHelper;
