const { setup: setupDevServer } = require("jest-dev-server")
module.exports = async () => {
    await setupDevServer([
        {   //BROWSER=none
            command: 'BROWSER=none npm start',
            launchTimeout: 60000,
            debug: true,
            port: 3000
        }])
}