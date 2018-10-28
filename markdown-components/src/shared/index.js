export class Index {
	/**
	 *
	 * @param section
	 * @param stories list of Story
	 * @param defaultStory
	 */
	constructor(section, stories, defaultStory) {
		this.parent = section;
		this.stories = stories;
		this.defaultStory = defaultStory;
	}
}
