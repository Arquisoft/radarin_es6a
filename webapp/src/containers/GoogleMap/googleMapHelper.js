class GoogleMapHelper {

    async getFriendsPosition(webId, latitud, longitud, callback) {

        let obj = webId.replace("https://", "").replace("/profile/card#me", "");
        console.log(obj);
        const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
        console.log(apiEndPoint)
        console.log(webId.replace("https://", "").replace("/profile/card#me", ""));
        let response = await fetch(apiEndPoint + '/friends/near/' + obj + '/' + longitud + '/' + latitud);
        response = await response.json();
        callback(response);
    }
}

const googleMapHelper = new GoogleMapHelper();

export default googleMapHelper;