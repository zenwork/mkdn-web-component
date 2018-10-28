import { StoreOperations } from '../../src/shared/store';

const po = StoreOperations;

test('process empty raw data', () => {
	let index = po.transformIndex('');
	expect(index).toEqual({});

	index = po.transformIndex(null);
	expect(index).toEqual({});

	index = po.transformIndex(undefined);
	expect(index).toEqual({});
});

test('process simplest definition', () => {
	let rawData = JSON.stringify({
		                             section:{
			                             title:'section',
			                             url:'md/section-index.json'
		                             },
		                             stories:{
			                             'first-story':'First Story',
			                             'second-story':'Second Story'
		                             }
	                             });
	let index = po.transformIndex(rawData);

	//sections
	expect(index.section.title).toBe('section');
	expect(index.section.url).not.toBeNull();

	//stories
	expect(index.stories).not.toBeNull();
	expect(Object.keys(index.stories).length).toBe(2);
	Object.keys(index.stories).map((key) => {
		let story = index.stories[key];
		let storyProps = Object.keys(story);
		expect(storyProps.length).toBe(6);
		storyProps.map((prop) => {
			expect(story[prop]).toBeDefined();
		});
	});

	expect(index.stories['first-story'].title).toBe('First Story');
	expect(index.stories['second-story'].title).toBe('Second Story');

	//default
	expect(index.default).toBe('first-story');

});
