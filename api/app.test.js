const request = require('supertest');
const app = require('./app');

describe('GET /customers', () => {
  it('should return 200', async () => {
    const response = await request(app).get('/customers');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(undefined);
    const { pageNumber, numPages, customers } = response.body;
    expect(customers.length).toBe(10);
    expect(pageNumber).toBe(1);
    expect(numPages).toBe(9);
  });

  it('should return 200 when query parameter page eqauls to two', async () => {
    const response = await request(app).get('/customers?page=2');
    expect(response.statusCode).toBe(200);
    const { pageNumber, numPages, customers } = response.body;
    expect(customers.length).toBe(10);
    expect(pageNumber).toBe(2);
    expect(numPages).toBe(9);
  });

  it('should return the last avaliable page  when query parameter page exceed the maximum number', async () => {
    const response = await request(app).get('/customers?page=99999');
    expect(response.statusCode).toBe(200);
    const { pageNumber, numPages, customers } = response.body;
    expect(pageNumber).toBe(9);
    expect(numPages).toBe(9);
  });
});

describe('GET /customers/customerID', () => {
  it('should return 200', async () => {
    const response = await request(app).get('/customers/user_11010');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(undefined);
    const expected_result = {
      customerID: 'user_11010',
      lastName: 'Suarez',
      firstName: 'Jacquelyn',
      address: '7800 Corrinne Court',
      phoneNumber: '1 (11) 500 555-0169',
    };
    expect(expected_result).toEqual(response.body);
  });

  it('should return 404', async () => {
    const response = await request(app).get('/customers/doesnotexist');
    expect(response.statusCode).toBe(404);
  });
});
