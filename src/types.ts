import { ScreenshotOptions } from 'puppeteer/src/puppeteer.js';

export type ActorInput = {
    html: string;
    templateData: object;
    imageType?: ScreenshotOptions['type'];
}
