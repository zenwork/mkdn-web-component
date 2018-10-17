const createTestCafe = require('testcafe');
let runner           = null;

createTestCafe('localhost', 1337, 1338)
	.then(testcafe => {
		runner = testcafe.createRunner();

		return testcafe.createBrowserConnection();
	})
	.then(remoteConnection => {
		runner
			.src('./fixture.js')
			.browsers(['firefox'])
			/*.reporter('json')*/
			.run()
			.then(failedCount => {
				/* ... */
			})
			.catch(error => {
				/* ... */
			});
	});
