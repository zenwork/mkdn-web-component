import {Selector} from 'testcafe';

fixture`Getting Started`
	.page`http://localhost:8080`;

test('empty component is built ', async t => {
	let wbco = Selector(() => document.querySelector('md-story').shadowRoot.querySelector('section'));
	let actual = await wbco.innerText;
	await t.expect(actual).eql('no markdown provided');
});
