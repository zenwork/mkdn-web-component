const createTestCafe = require('testcafe');
let runner = null;
let testcafe =null

createTestCafe('localhost', 1337, 1338)
	.then(tc => {
		testcafe = tc
		runner = tc.createRunner();

		return tc.createBrowserConnection();
	})
	.then(remoteConnection => {
		runner
			.src('test/**/*page*')
			.browsers(['chrome:headless'])
			.run()
			.then(failedCount => {
				console.log('Tests failed: ' + failedCount);
				testcafe.close();
			})
			.catch(error => {
				console.log('Testing Error ' + error);
				testcafe.close();
			});
	});
