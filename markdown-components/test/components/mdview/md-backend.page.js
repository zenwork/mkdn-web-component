import { Selector } from 'testcafe';

function getListSelector() {
	return Selector(() => document
		.querySelector('#live > md-view > md-list')
		.shadowRoot
		.querySelectorAll('section > ul > li > button'));
}

function getTitleSelector() {
	return Selector(() => document
		.querySelector('#live > md-view > md-story')
		.shadowRoot
		.querySelectorAll('section > div > h1'));
}

fixture`md-view - backend `
	.page`http://localhost:8080/demo/mdview/backend.html`;

test('list rendered', async t => {
	await t.expect(await getListSelector().count).eql(2);
});

test('story rendered', async t => {
	await t.click(await getListSelector().nth(1));
	await t.expect(await getTitleSelector().nth(0).innerText).eql('Title 2');
});

test('selection changes crumbs', async t => {
	const selector = Selector(() => {
		return document
			.querySelector('md-crumbs')
			.shadowRoot
			.querySelectorAll('ul > li > a');
	});

	await t.expect(await selector.count).eql(1);

	await t.expect(await selector.nth(0).innerText).eql('home');
});
