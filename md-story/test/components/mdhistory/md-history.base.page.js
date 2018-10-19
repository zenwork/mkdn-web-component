import {Selector} from 'testcafe';

fixture`md-history - empty`
	.page`http://localhost:8080/demo/mdhistory/base.html`;

test('empty component is present ', async t => {
	let wbco = Selector(() => document.querySelector('#empty').shadowRoot.querySelector('section > ul > li'));
	let actual = await wbco.nth(0).innerText;
	await t.expect(actual).eql('no history');
});

test('simple list is rendered', async t => {
	let list = Selector(() => document.querySelector('#simple-list').shadowRoot.querySelectorAll('section > ul > li'));
	let actual = await list.nth(0).innerText;
	await t.expect(actual).eql('Title 1');
	actual = await list.nth(1).innerText;
	await t.expect(actual).eql('Title 2');
});
