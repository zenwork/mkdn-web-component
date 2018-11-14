/**
 * data class describing
 */
export class Index {

  /**
   *
   * @param {Array} sections
   * @param {Object} stories list of Story
   * @param {String} defaultStory
   */
  constructor(sections, stories, defaultStory) {
    this.sections = sections;
    this.stories = stories;
    this.defaultStory = defaultStory;
  }

  getDefault() {
    const keys = Object.keys(this.stories);
    const stories = this.stories;
    const filter = keys.filter((key) => {
      return stories[key].url === this.defaultStory;
    });
    return stories[filter[0]];
  }

  getStoryByUrl(url) {
    const keys = Object.keys(this.stories);
    return keys.filter((story) => story.url === url)[0];
  }

}
