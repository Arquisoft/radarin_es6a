class ChatHelper {
	async getMessages(email1, email2) {
		const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
		console.log(apiEndPoint)
		let response = await fetch(apiEndPoint+'/chat/' + email1 + "/" + email2)
		return await response.json()
	}

	async sendMessages(email1,email2) {
		const requestOptions = {
			method: 'INSERT'
		  };
		const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
		console.log(apiEndPoint )
		let response = await fetch(apiEndPoint+'/chat/' +email1+ "/" + email2, requestOptions)
		return await response.json()
	}
}
const chatHelper = new ChatHelper();

export default ChatHelper;