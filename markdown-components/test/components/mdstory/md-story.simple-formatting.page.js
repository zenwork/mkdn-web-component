import {Selector} from 'testcafe';

fixture`md-story - simple formatting`
	.page`http://localhost:8080/demo/mdstory/simple-formatting.html`;

test('component with content is present and formatted ', async t => {
	//find title
	let story = Selector(() => document.querySelector('md-story').shadowRoot.querySelectorAll('section > div > h1'),
	                     {visibilityCheck:true});

	let count = await story.count;
	await t.expect(count).eql(1);

	let formattedContent = await story.innerText;
	await t.expect(formattedContent).eql('The Blog Title');

	//find sub-titles
	let subtitles = Selector(() => document.querySelector('md-story').shadowRoot.querySelectorAll('section > div > h2'),
	                        {visibilityCheck:true});
	let subtitlecount = await subtitles.count;
	await t.expect(subtitlecount).eql(5);


	await t.expect(await subtitles.nth(0).innerText).eql('The standard Lorem Ipsum passage, used since the 1500s');
	await t.expect(await subtitles.nth(4).innerText).eql('1914 translation by H. Rackham');
});
