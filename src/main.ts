import { Actor, log } from 'apify';
import { launchPuppeteer, utils } from 'crawlee';
import { v4 as uuidv4 } from 'uuid';
import { ActorInput } from './types.js';
import { prepareHtml, validateInput } from './utils.js';

await Actor.init();

const actorInput = await Actor.getInput<ActorInput>();

// Validates Actor Input
validateInput(actorInput);

// Start a browser
const browser = await launchPuppeteer();

// Open new tab in the browser
const page = await browser.newPage();

await page.setViewport({
    width: 1200,
    height: 630,
});

await page.setContent(prepareHtml(actorInput!), {
    waitUntil: ['domcontentloaded'],
    timeout: 5000,
});

// Capture & save the screenshot
const imageKey = `og-image-${uuidv4()}`;
await utils.puppeteer.saveSnapshot(page, { key: imageKey, saveHtml: false, screenshotQuality: 100 });

// Get saved OG image public URL
const ogImagesStore = await Actor.openKeyValueStore();
const publicOgUrl = await ogImagesStore.getPublicUrl(`${imageKey}.jpg`);

// Push the public URL run output
await Actor.pushData({ url: publicOgUrl });

log.info('OG Image generated successfully!');

// Close Puppeteer
await browser.close();

await Actor.exit();
