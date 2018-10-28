/**
 * Story Definition
 */
export class Story {

	constructor(key, title, content, url, shortTitle, hash) {
		this.url = key;
		this.title = title;
		this.hash = hash;
		this.shortTitle = shortTitle;
		this.key = key;
		this.content = content;
	}
}
