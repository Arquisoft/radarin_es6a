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
        idp = 'inrupt.net'
        email = 'pablo'
        const response = await request(app).post('/api/users/add').send({ idp: idp, email: email }).set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
        expect(response.body.idp).toBe("https://" + idp);
        expect(response.body.email).toBe(email);
    });

    /**
     * Tests that the same user can not be inserted.
     */
    it('can not be created correctly', async () => {
        idp = 'inrupt.net'
        email = 'pablo'
        err = "Error: This user is already registered"
        const response = await request(app).post('/api/users/add').send({ idp: idp, email: email }).set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe(err);
    });

    /**
     * Tests that a user can be deleted without throwing any errors.
     */
    it('can be deleted correctly', async () => {
        idp = 'inrupt.net'
        email = 'pablo'
        let pablo = await request(app).get('/api/users/get/' + idp + "/" + email).set('Accept', 'application/json');
        const response = await request(app).delete('/api/users/delete/' + pablo.body._id);
        expect(response.statusCode).toBe(200);
    });

    /**
     * Remains Pablo in the DB to do next tests
     */
    it('can be created correctly', async () => {
        idp = 'inrupt.net'
        email = 'pablo'
        const response = await request(app).post('/api/users/add').send({ idp: idp, email: email }).set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
        expect(response.body.idp).toBe("https://" + idp);
        expect(response.body.email).toBe(email);
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

    /**
     * Tests that a location can be created without throwing any errors.
     * pablo is the email
     */
    it('can be created correctly', async () => {
        longitud = -6.23277;
        latitud = 34.23;
        email = 'pablo.inrupt.net';
        const response = await request(app).post('/api/locations/add')
            .send({
                longitud: longitud,
                latitud: latitud,
                webID: email
            }).set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
        expect(response.body.longitud).toBe(longitud);
        expect(response.body.latitud).toBe(latitud);
    });
});
