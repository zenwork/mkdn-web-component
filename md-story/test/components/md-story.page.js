import {Selector} from 'testcafe';


fixture`md-story web component`
	.page`http://localhost:8080/empty.html`;

test('empty component is present ', async t => {
	let wbco = Selector(() => document.querySelector('md-story').shadowRoot.querySelector('section'));
	let actual = await wbco.innerText;
	await t.expect(actual).eql('no markdown provided');
});

fixture`md-story web component`
	.page`http://localhost:8080/simple.html`;

test('empty component is present ', async t => {
	let wbco = Selector(() => document.querySelector('md-story').shadowRoot.querySelector('section'));
	let actual = await wbco.innerText;
	await t.expect(actual).eql('no markdown provided');
});
