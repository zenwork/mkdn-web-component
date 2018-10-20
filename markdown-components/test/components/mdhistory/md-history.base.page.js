import {ClientFunction, Selector} from 'testcafe';

fixture`md-list `
	.page`http://localhost:8080/demo/mdlist/base.html`;

test('empty component is present ', async t => {

	let wbco = Selector(() => document
		.querySelector('#empty > md-list')
		.shadowRoot
		.querySelector('section > ul > li'));

	let actual = await wbco.nth(0).innerText;
	await t.expect(actual).eql('no items');
});

test('simple list is rendered', async t => {

	let list = Selector(() => document
		.querySelector('#simple-list > md-list')
		.shadowRoot
		.querySelectorAll('section > ul > li'));

	let actual = await list.nth(0).innerText;
	await t.expect(actual).eql('Title 1');
	actual = await list.nth(1).innerText;
	await t.expect(actual).eql('Title 2');
});

test('event dispatching', async t => {

	let selection = Selector(() => document
		.querySelector('#simple-list > md-list')
		.shadowRoot
		.querySelector('section > ul > li > a'));

	let addListener = ClientFunction(() => {
		console.log('adding listener');
		document
			.querySelector('#simple-list > md-list')
			.addEventListener('md-list-selected',
			                  function (e) {
				                  console.log(e);
				                  window.captured = e.detail.title;
			                  }
			);
	});

	let collectEvent = ClientFunction(() => {return window.captured;});

	await addListener();
	await t.click(selection);
	let event = await collectEvent();

	await t.expect(event).eql('Title 1');

});
