import { Selector } from 'testcafe';

fixture`mkdn-story - empty`
	.page`http://localhost:8080/demo/mkdnstory/empty.html`;

test('empty component is present ', async t => {
	let wbco = Selector(() => document.querySelector('mkdn-story').shadowRoot.querySelector('section > div'));
	let actual = await wbco.innerText;
	await t.expect(actual).eql('no markdown provided');
});

fixture`mkdn-story - simple string`
	.page`http://localhost:8080/demo/mkdnstory/simple.html`;

test('component with content is present ', async t => {
	//check default content is not visible
	let defaultSlot = Selector(() => document.querySelector('mkdn-story').shadowRoot.querySelector('section > div'));
	let defaultContent = await defaultSlot.innerText;
	await t.expect(defaultContent).eql('some markdown');
});
