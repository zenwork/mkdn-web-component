import { ClientFunction, Selector } from 'testcafe';

function getListSelector() {
	return Selector(() => document
		.querySelector('#static > mkdn-view > mkdn-list')
		.shadowRoot
		.querySelectorAll('section > ul > li > button'));
}

function getTitleSelector() {
	return Selector(() => document
		.querySelector('#static > mkdn-view > mkdn-story')
		.shadowRoot
		.querySelectorAll('section > div > h1'));
}

fixture`mkdn-view`
	.page`http://localhost:8080/demo/mkdnview/base.html`;

test('empty component is present ', async t => {

	await t.expect(await Selector(() => document
		.querySelector('#empty > mkdn-list')
		.shadowRoot
		.querySelector('section > ul > li'), {visibilityCheck:true}))
		.ok('list found');

	await t.expect(await Selector(() => document
		.querySelector('#empty > mkdn-view > mkdn-story')
		.shadowRoot
		.querySelector('section > div > p'), {visibilityCheck:true}))
		.ok('story found');
});

test('list rendered', async t => {
	let list = Selector(() => document
		.querySelector('#static > mkdn-view > mkdn-list')
		.shadowRoot
		.querySelectorAll('section > ul > li'));

	await t.expect(await list.count).eql(3);
});

test('story rendered', async t => {
	let list = getListSelector();

	let title = getTitleSelector();

	await t
		.click(await list.nth(1))
		.expect(title.nth(0).innerText).eql('Title 2')
		.click(await list.nth(0))
		.expect(title.nth(0).innerText).eql('Title 1');
});

test('update static store', async t => {

	let updateData = ClientFunction(() => document.querySelector('#static > mkdn-view > mkdn-static-store')
		.innerHTML = `
                {
                    "section": {
                        "title": "November",
                        "url": "md/2018/index.json",
                        "member-of": {
                            "title": "2018",
                            "url": "md/2018/index.json"
                        }
                    },
                    "stories": {
                        "my-first-Blog": {
                            "title":"My First Blog",
                            "content":"# Title 1\\n\\n First Blog content."
                            },
                        "my-second-blog": {
                            "title": "My Second Blog: Introduction to MkDn",
                            "hash": "my-second-blog",
                            "short-title": "My 2nd Blog",
                            "content":"# Title 2\\n\\nThe content"
                        },
                        "https://google.com": {"redirect": "true", "title": "google"},
                        "my-fourth-blog":{
                            "title":"My Forth Blog",
                            "content":"# Title 4\\n\\n Forth Blog content."
                        }
                    },
                    "default":"my-first-Blog"
                }
            `);
	await updateData();

	let list = getListSelector();

	await t.expect(await list.count).eql(4);

	let title = getTitleSelector();

	await t
		.click(await list.nth(1))
		.expect(title.nth(0).innerText).eql('Title 2')
		.click(await list.nth(3))
		.expect(title.nth(0).innerText).eql('Title 4');
});
