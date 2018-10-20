import {ClientFunction, Selector} from 'testcafe';

function getListSelector() {
	return Selector(() => document
		.querySelector('#static > md-view > md-list')
		.shadowRoot
		.querySelectorAll('section > ul > li > a'));
}

function getTitleSelector() {
	return Selector(() => document
		.querySelector('#static > md-view > md-story')
		.shadowRoot
		.querySelectorAll('section > div > h1'));
}

fixture`md-view `
	.page`http://localhost:8080/demo/mdview/base.html`;

test('empty component is present ', async t => {

	await t.expect(await Selector('#empty > md-view > md-list').nth(0))
		.ok('list found');

	await t.expect(await Selector('#empty > md-view > md-story').nth(0))
		.ok('list found');
});

test('list rendered', async t => {
	let list = Selector(() => document
		.querySelector('#static > md-view > md-list')
		.shadowRoot
		.querySelectorAll('section > ul > li'));

	await t.expect(await list.count).eql(2);
});

test('story rendered', async t => {
	let list = getListSelector();

	let title = getTitleSelector();

	await t
		.click(await list.nth(1))
		.expect(title.nth(0).innerText).eql('Title 2')
		.click(await list.nth(0))
		.expect(title.nth(0).innerText).eql('Title 1');
});

test('update static store', async t => {
	let wbco = Selector('#static > md-view > md-static-store');

	let updateData = ClientFunction(() => document.querySelector('#static > md-view > md-static-store')
		.innerHTML = '[ {"key": "title-1", "title": "Title 1", "content": "# Title 1\\n\\nSome content about #1"},' +
	                 ' {"key": "title-2", "title": "Title 2", "content": "# Title 2\\n\\nSome content about #2"}, ' +
	                 '{"key": "title-3", "title": "Title 3", "content": "# Title 3\\n\\nSome content about #3"}, ' +
	                 '{"key": "title-4", "title": "Title 4", "content": "# Title 4\\n\\nSome content about #4"} ]');
	await updateData();

	let list = getListSelector();

	await t.expect(await list.count).eql(4);

	let title = getTitleSelector();

	await t
		.click(await list.nth(2))
		.expect(title.nth(0).innerText).eql('Title 3')
		.click(await list.nth(3))
		.expect(title.nth(0).innerText).eql('Title 4');
});
