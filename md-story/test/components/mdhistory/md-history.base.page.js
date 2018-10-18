import {Selector} from 'testcafe';


fixture`md-history - empty`
	.page`http://localhost:8080/demo/mdhistory/base.html`;

test('empty component is present ', async t => {
	let wbco = Selector(() => document.querySelector('md-history').shadowRoot.querySelector('section > p'));
	let actual = await wbco.innerText;
	await t.expect(actual).eql('no history');
});
