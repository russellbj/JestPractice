const fetch = require('node-fetch');
const swapi = require('./Script.js');

it('calls swapi to get people', (done) => {
	expect.assertions(3)
	return swapi.getPeople(fetch)
	.then(data => {
		expect(data.count).toEqual(87)
		expect(data.results.length).toBeGreaterThan(5)
		expect(data.results[0].name).toEqual("Luke Skywalker")
		done();
	})
})

it('getPeople with mock values', () => {
	const mockFetch = jest.fn()
	.mockReturnValue(Promise.resolve({
		json: () => Promise.resolve({
			count: 87,
			results: [1,2,3,4,5]
		}) 
	}))

	expect.assertions(4);
	return swapi.getPeople(mockFetch).then(data => {
		expect(mockFetch.mock.calls.length).toBe(1);
		expect(data.count).toEqual(87);
		expect(data.results.length).toBeGreaterThan(4);
		expect(data.results[1]).toEqual(2);
	})
})