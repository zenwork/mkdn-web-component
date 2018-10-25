import { ClientFunction, Selector } from 'testcafe';

const selectChildren = function () {
	return Selector(() => {
		return document.querySelectorAll('#with-parent > md-parent > md-child');
	})
		.addCustomDOMProperties({elId:(el => el.getAttribute('id')), innerHTML:(el => el.innerHTML)});
};

const selectChildReadyMessage = Selector(value =>
	                                         document
		                                         .getElementById(value)
		                                         .shadowRoot
		                                         .querySelectorAll('p')[0]);

fixture`parent child test`
	.page`http://localhost:8080/demo/childparent/base.html`;

test('all children reach READY state', async t => {

	let children = await selectChildren();
	let count = await children.count;

	const range = [];
	for (let idx = 0; idx < count; idx++) {
		range.push(idx);
	}

	await Promise.all(
		range.map(async (idx) => {

			let elementId = await children.nth(idx).elId;

			let message = await selectChildReadyMessage(elementId);

			await t
				.expect(await message.innerText)
				.match(new RegExp('READY.*'), `child ${elementId} did not reach READY state`);

			await t
				.expect(await message.innerText)
				.match(new RegExp(`md-child:${elementId}`), `child ${elementId} did not reach READY state`);
		})
	);

});

test('all siblings reach READY state', async t => {

	await t.expect(await Selector(() => document
		.getElementById('c1')
		.shadowRoot
		.querySelectorAll('ul > li')).count).eql(2);

	await t.expect(await Selector(() => document
		.getElementById('c2')
		.shadowRoot
		.querySelectorAll('ul > li')).count).eql(2);

	await t.expect(await Selector(() => document
		.getElementById('c3')
		.shadowRoot
		.querySelectorAll('ul > li')).count).eql(2);
});

test('add child', async t => {

	let addElement = new ClientFunction(() => {
		let child = document.createElement('md-child');
		child.id = 'c4';
		document.querySelector('#with-parent > md-parent').appendChild(child);
	});
	
	await addElement();

	await t.expect(await Selector(() => document
		.getElementById('c4')
		.shadowRoot
		.querySelectorAll('ul > li')).count).eql(3);

	await t.expect(await Selector(() => document
		.getElementById('c1')
		.shadowRoot
		.querySelectorAll('ul > li')).count).eql(3);

	await t.expect(await Selector(() => document
		.getElementById('c2')
		.shadowRoot
		.querySelectorAll('ul > li')).count).eql(3);

	await t.expect(await Selector(() => document
		.getElementById('c3')
		.shadowRoot
		.querySelectorAll('ul > li')).count).eql(3);
});

test('remove child', async t => {

	let removeElement = new ClientFunction(() => {
		document.querySelector('#with-parent > md-parent').removeChild(document.querySelector('#c1'));
	});

	await removeElement();

	await t.expect(await Selector(() => document.getElementById('c1')).exists).notOk();

	await t.expect(await Selector(() => document
		.getElementById('c2')
		.shadowRoot
		.querySelectorAll('ul > li')).count).eql(1);

	await t.expect(await Selector(() => document
		.getElementById('c3')
		.shadowRoot
		.querySelectorAll('ul > li')).count).eql(1);
});
