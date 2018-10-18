import {Selector, ClientFunction} from 'testcafe';

fixture`md-story - attributes`
	.page`http://localhost:8080/demo/attributes.html`;

test('hidden attributes ', async t => {
	let wbco = Selector(() => document.querySelector('md-story').shadowRoot.querySelector('section'));
	await t.expect(await wbco.exists).eql(false);

	let fn = ClientFunction(() => {return  document.querySelector('md-story').removeAttribute('hidden');});
	await fn();

	await t.expect(await wbco.exists).eql(true);

});

test('hidden attribute value ignored', async t => {
	let wbco = Selector(() => document.querySelector('md-story').shadowRoot.querySelector('section'));
	await t.expect(await wbco.exists).eql(false);

	let fn = ClientFunction(() => {document.querySelector('md-story').setAttribute('hidden','false');});
	await fn();

	await t.expect(await wbco.exists).eql(false);

});
