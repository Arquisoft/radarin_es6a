
class UsuariosHelper {
	async getUsuarios(email) {
		const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
		console.log(apiEndPoint)
		let response = await fetch(apiEndPoint+'/users/list')
		return await response.json()
	}

	async deleteUsuarios(id) {
		const requestOptions = {
			method: 'DELETE'
		  };
		const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
		console.log(apiEndPoint + " " + id)
		let response = await fetch(apiEndPoint+'/locations/delete/' + id, requestOptions)
		return await response.json()
	}
}
const usuariosHelper = new UsuariosHelper();

export default usuariosHelper;
