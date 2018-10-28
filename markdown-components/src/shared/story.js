/**
 * Story Definition
 */
export class Story {

	constructor(url, title, shortTitle, hash, redirect, content) {
		this.url = url;
		this.title = title;
		this.shortTitle = shortTitle;
		this.hash = hash;
		this.redirect = redirect;
		this.content = content;
	}

	static standardizeAll(stories) {
		let output = {};
		Object
			.keys(stories)
			.map((key) => {

				let story = stories[key];
				let title;
				if (typeof story === 'object') {
					if (!story.title) {
						throw Error('A story needs at minimum a title');
					} else {
						title = story.title;
					}
				}

				if (typeof story === 'string') {
					if (!story) {
						throw Error('A story needs at minimum a title');
					} else {
						title = story;
					}
				}

				output[key] = new Story(key,
				                        title,
				                        story.shortTitle ? story.shortTitle : null,
				                        story.hash ? story.hash : null,
				                        story.redirect ? story.redirect : null,
				                        story.content ? story.content : null);

			});

		return output;
	}
}
