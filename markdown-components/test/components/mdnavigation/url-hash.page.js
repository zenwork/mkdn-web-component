import { ClientFunction, Selector } from 'testcafe';

function getTitleSelector() {
	return Selector(() => document
		.querySelector('#live > md-view > md-story')
		.shadowRoot
		.querySelectorAll('section > div > h1'));
}

fixture`navigation test`
	.page`http://localhost:8080/demo/mdview/`;

test('load no story when hash is unknown', async t => {

	let changeUrl = new ClientFunction(() => {
		window.location
			= 'http://localhost:8080/demo/mdview/backend.html#story-3';
	});
	await changeUrl();

	let title = Selector(() => document
		.querySelector('#live > md-view > md-story')
		.shadowRoot
		.querySelectorAll('section > div'));

	await t.expect(title.nth(0).innerText).eql('no markdown provided');

});

test('load story based on urls with hash', async t => {

	let changeUrl = new ClientFunction(() => {
		window.location
			= 'http://localhost:8080/demo/mdview/backend.html#story-2';
	});
	await changeUrl();

	let title = getTitleSelector();

	await t.expect(title.nth(0).innerText).eql('Title 2');

});
