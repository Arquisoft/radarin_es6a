
class UsuariosHelper {
	async addUser(email, idp){
		const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
		let response = await fetch(apiEndPoint+'/users/add', {
			method: 'POST',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({'idp':idp, 'email':email})
		  })
		return await response.json()
	}

	async deleteUsuarios(email) {
		const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
		console.log(apiEndPoint + " " + email)
		let response = await fetch(apiEndPoint+'/users/delete/' + email)
		return await response.json()
	}
}
const usuariosHelper = new UsuariosHelper();

export default usuariosHelper;
