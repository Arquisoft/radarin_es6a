class ChatHelper {
	async getMessages(email1, email2) {
		const requestOptions ={
			method: 'POST',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({'email1':email1, 'email2':email2})
		  }
		const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
		console.log(apiEndPoint)
		let response = await fetch(apiEndPoint+'/chat/list',requestOptions)
		return await response.json()
	}

    async sendMessages(email1,email2,mensaje) {
		const requestOptions ={
			method: 'POST',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({'email1':email1, 'email2':email2,'mensaje':mensaje})
		  }
		const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
		console.log(apiEndPoint )
		let response = await fetch(apiEndPoint+'/chat/send', requestOptions)
		return await response.json()
	}

	
}
const chatHelper = new ChatHelper();

export default chatHelper;