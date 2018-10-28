import { Section } from './section';
import { Story } from './story';
import { clone } from './util';

export class StoreOperations {

	static transformIndex(rawData) {
		let input;
		if (rawData) {
			input = JSON.parse(rawData);
		} else {
			return {};
		}

		let output = {};

		if (input.section) { Section.validate(input.section);}
		output.section = clone(input.section);

		if (input.stories) { output.stories = Story.standardizeAll(input.stories);}

		if (input.default) {
			output.default = input.default;
		} else {
			output.default = Object.keys(input.stories)[0];
		}

		return output;
	}

	static findStory(stories, key) {
		let keys = Object.keys(stories);
		let found = keys.filter((k) => key === k);
		return stories[found];
	}
}
