import { Selector } from 'testcafe';

fixture`navigation test`
	.page`http://localhost:8080/demo/mkdnnavigation/base.html`;

test('component is empty', async t => {

	let wbco = Selector(() => {return document.querySelector('#empty > mkdn-nav').shadowRoot;});
	await t.expect(await wbco.exists).ok();
	// let content = await wbco.textContent;
	let content = await t.eval(() => {return document.querySelector('#empty > mkdn-nav').shadowRoot.innerHTML;});
	await t.expect(content).match(new RegExp('<ul.*&nbsp;.*ul>'));
});

test('component is static', async t => {

	let wbco = Selector(() => {return document.querySelector('#standalone > mkdn-nav').shadowRoot;});
	await t.expect(await wbco.exists).ok();
	// let content = await wbco.textContent;
	let location = await t.eval(() => {return window.location.href;});
	await t.expect(await location).eql('http://localhost:8080/demo/mkdnnavigation/base.html#my-page');

	let links = await Selector(() => {
		return document
			.querySelector('#standalone > mkdn-nav')
			.shadowRoot
			.querySelectorAll('ul > li > a');
	});
	await t.expect(await links.count).eql(3);
});


