import puppeteer from 'puppeteer';
import {loremIpsum} from './content';

const wbco = 'http://127.0.0.1:8080/';

const content = loremIpsum;

let page;
let browser;
const width = 1920;
const height = 1080;

beforeAll(async () => {
	browser = await puppeteer.launch(
		{
			headless:false,
			slowMo:80,
			args:[`--window-size=${width},${height}`]
		});
	page = await browser.newPage();
	await page.setViewport({width, height});
});

describe('Testing md-story compoent', () => {
	test('that component apears in the DOM', async () => {
		await page.goto(wbco);
		const story = await page.waitForSelector("md-story");
		expect(story.toString()).not.toBe(null);
	},16000);
});

afterAll(() => {
	browser.close();
});

