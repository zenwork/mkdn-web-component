import * as hljs from 'highlight.js';

export default class StoryConfig {

	static baseMarkedConfig = { headerPrefix: 'mkdn',
		highlight (code) {
			return hljs.highlightAuto(code).value
		},
		silent: true };

	static create() {
        return Object.assign({}, StoryConfig.baseMarkedConfig);
    }

	static debug () {
        return Object.assign(StoryConfig.create(), { silent: false });
	}
}
