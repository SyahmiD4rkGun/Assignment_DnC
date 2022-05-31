const { response } = require('express');
const req = require('express/lib/request');
const supertest = require('supertest');
const request = supertest('http://localhost:5000');

describe('Express Route Test', function () {
	const data = {
		name: 'azlan',
		password: "1234"
	}

	it('create', async () => {
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

	it('read', async () => {
		return request
		.get('/check')
		.send(data)
		.expect('Content-Type', /json/)
		.expect(200).then(response => {
			expect(response.body).toEqual(
				expect.objectContaining(
					{
						name : expect.any(String),
						password : expect.any(String)

					}
				)
			)
		})
	})

	it('update', async () => {
		return request
			.patch('/update')
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

	})

	it('delete', async () => {
		return request
			.delete('/delete')
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
	})

	
});