import {Index}   from './index';
import {Section} from './section';
import {Story}   from './story';
import {clone}   from './util';

export class StoreOperations {

  static transformIndex(rawData) {
    let input;
    if (rawData) {
      input = JSON.parse(rawData);
    } else {
      return {};
    }

    const output = {};

    if (input.sections) {
      input.sections.map((section) => Section.validate(section));
    }
    output.sections = clone(input.sections);

    if (input.stories) {
      output.stories = Story.standardizeAll(input.stories);
    }

    if (input.default) {
      output.default = input.default;
    } else {
      output.default = Object.keys(input.stories)[0];
    }

    return new Index(output.sections, output.stories, output.default);
  }

  static findStory(stories, key) {
    const keys = Object.keys(stories);
    const found = keys.filter((k) => key === k);
    return stories[found];
  }

}
