export class Section {
	constructor(title, url, memberOf) {
		this.title = title;
		this.url = url;
		this.memberOf = memberOf;

	}

	static validate(section) {
		if (!section.title) throw Error('[section.title] is required');
		if (!section.url) throw Error('[section.url] to index is required');
		if (section.memberOf) {
			if (!section.memberOf.title) throw Error('[section.memberOf.title] is required');
			if (!section.memberOf.url) throw Error('[section.memberOf.url] to index is required');
		}
	}
	
}
