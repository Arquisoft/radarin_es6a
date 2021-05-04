import { foaf } from "rdf-namespaces";
import { fetchDocument } from "tripledoc";

class UsersHelper {
	async addUser(email, idp){
		const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
		let response = await fetch(apiEndPoint+'/users/add', {
			method: 'POST',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({'idp':idp, 'email':email})
		  })
		return await response.json()
	}

	async deleteUsers(id) {
		const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
		console.log(apiEndPoint + " " + id)
		let response = await fetch(apiEndPoint+'/users/delete/' + id)
		return await response.json()
	}

	async getName(webId) {
		const doc = await fetchDocument(webId);
		const me = doc.getSubject(webId);
		me.getString(foaf.name);
	}
}
const usersHelper = new UsersHelper();

export default usersHelper;
