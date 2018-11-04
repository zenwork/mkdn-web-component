import StoryConfig from '../../../src/components/mkdn-story-config';

test('get debug config', () => {
	const debug = StoryConfig.debug()
	expect(debug.silent).toBe(false)
})

