import { ClientFunction, Selector } from 'testcafe';

fixture`mkdn-story - attributes`
	.page`http://localhost:8080/demo/mkdnstory/attributes.html`;

test('hidden attributes ', async t => {
	let wbco = Selector(() => document.querySelector('mkdn-story').shadowRoot.querySelector('section'));
	await t.expect(await wbco.exists).eql(false);

	let fn = ClientFunction(() => {return document.querySelector('mkdn-story').removeAttribute('hidden');});
	await fn();

	await t.expect(await wbco.exists).eql(true);

});

test('hidden attribute value ignored', async t => {
	let wbco = Selector(() => document.querySelector('mkdn-story').shadowRoot.querySelector('section'));
	await t.expect(await wbco.exists).eql(false);

	let fn = ClientFunction(() => {document.querySelector('mkdn-story').setAttribute('hidden', 'false');});
	await fn();

	await t.expect(await wbco.exists).eql(false);

});
