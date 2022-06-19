const { prepareParams } = require('api/src/lib');
const { response } = require('express');
const { param } = require('express/lib/request');
const req = require('express/lib/request');
const supertest = require('supertest');
const request = supertest('http://localhost:5000');

describe('Express Route Test', function () {
	const data = {
		id: "1",
		name: "sy",
		password: "try99",
		Email: "syahlol@gmail.com",
		details: [
			{Age: "29",
			Blood_Type: "A"}
		]
	}

	it('register successfully', async () => {
		return request
			.post('/register')
			.send(data)
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body).toEqual(
					expect.objectContaining(
						{
							acknowledged : true
	
						}
					)
				);
			});
	});

	it('register failed', async () => {
		return request
		.post('/register')
		.expect('Content-Type', /json/)
		.send(data)
		.expect(401).then(response => {
			expect(response.body).toEqual(
				expect.objectContaining(
					{
						status: "error"
					}
				)
			)
		})
	})

	it('login successful', async () => {
		return request
			.post('/login')
			.send(data)
			.expect('Content-Type', /json/)
			.expect(200).then(response => {
				expect(response.body).toEqual(true);
			});

	})

	it('login failed', async () => {
		return request
			.post('/login')
			.send({
				id: "1",
				password:"lucky"
			})
			.expect('Content-Type', /json/)
			.expect(401).then(response => {
				expect(response.body).toEqual(
					expect.objectContaining(
						{
							status: "error"
	
						}
					)
				);
			});
	})

	
});