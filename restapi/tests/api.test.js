const request = require('supertest');
const server = require('./server-for-tests')

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
    await server.startdb()
    app = await server.startserver()
});

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
    await server.clearDatabase()
    await server.closeServer() //finish the server
    await server.closeDB()
})

/**
 * USER test suite.
 */
describe('user ', () => {
    /**
     * Test that we can list users without any error.
     */
    it('can be listed', async () => {
        const response = await request(app).get("/api/users/list");
        expect(response.statusCode).toBe(200);
    });

    /**
     * Tests that a user can be created through the productService without throwing any errors.
     */
    it('can be created correctly', async () => {
        idp = "https://inrupt.net";
        email = 'pablo';
        webID = 'pablo.https://inrupt.net';
        const response = await request(app).post('/api/users/add').send({ idp: idp, email: email }).set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
        expect(response.body.webID).toBe(webID);
    });

    /**
     * Tests that the same user can not be inserted.
     */
    it('can not be created correctly', async () => {
        idp = "https://inrupt.net";
        email = 'pablo';
        webID = 'pablo.https://inrupt.net';
        err = "Error: This user is already registered"
        const response = await request(app).post('/api/users/add').send({ idp: idp, email: email }).set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe(err);
    });
});
/**
 * LOCATION test suite.
 */
describe('location ', () => {
    /**
     * Test that we can list locations without any error.
     */
    it('can be listed', async () => {
        const response = await request(app).get("/api/locations/list");
        expect(response.statusCode).toBe(200);
    });
});