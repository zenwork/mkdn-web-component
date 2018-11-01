import { ClientFunction, Selector } from 'testcafe';

fixture`mkdn-story - update content`
	.page`http://localhost:8080/demo/mkdnstory/empty.html`;


test('hidden attributes ', async t => {
	let content = Selector(() => document.querySelector('mkdn-story').shadowRoot.querySelector('section > div > p'));
	await t.expect(await content.exists).eql(true);
	await t.expect(await content.innerText).eql('no markdown provided');
	let fn = ClientFunction(() => document.querySelector('mkdn-story').innerText = 'Injected Content');

	await fn();
	await t.expect(await content.exists).eql(true);
	await t.expect(await content.innerText).eql('Injected Content');

});

