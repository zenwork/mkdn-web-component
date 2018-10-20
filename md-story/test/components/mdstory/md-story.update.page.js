import {Selector, ClientFunction} from 'testcafe';

fixture`md-story - update content`
	.page`http://localhost:8080/demo/mdstory/empty.html`;


test('hidden attributes ', async t => {
	let content = Selector(() => document.querySelector('md-story').shadowRoot.querySelector('section > div > p'));
	await t.expect(await content.exists).eql(true);
	await t.expect(await content.innerText).eql('no markdown provided');
	let fn = ClientFunction(() => document.querySelector('md-story').innerText = 'Injected Content');

	await fn();
	await t.expect(await content.exists).eql(true);
	await t.expect(await content.innerText).eql('Injected Content');

});

