import {Selector} from 'testcafe';


fixture`md-story web component`
	.page`http://localhost:8080/demo/empty.html`;

test('empty component is present ', async t => {
	let wbco = Selector(() => document.querySelector('md-story').shadowRoot.querySelector('section').querySelector('slot'));
	let actual = await wbco.innerText;
	await t.expect(actual).eql('no markdown provided');
});

fixture`md-story web component`
	.page`http://localhost:8080/demo/simple.html`;

test('component with content is present ', async t => {
	//check default content is not visible
	let defaultSlot = Selector(() => document.querySelector('md-story').shadowRoot.querySelector('section').querySelector('slot'));
	let defaultContent = await defaultSlot.innerText;
	await t.expect(defaultContent).eql('');

	//check slot content is present. Note: not sure how to check this better at this point.
	let wbco = Selector(() => document.querySelector('md-story'));
	let actual = await wbco.innerText;
	await t.expect(actual).eql('some markdown');
});
