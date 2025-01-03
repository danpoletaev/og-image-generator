import { ActorInput } from './types.js';

export const validateInput = (actorInput: ActorInput | null) => {
    if (!actorInput) {
        throw new Error('Input  can not be null!');
    }

    const { html, templateData } = actorInput;

    if (!html || !templateData) {
        throw new Error('Please provide the htmlBody and templateData input fields!');
    }

    if (!Object.keys(templateData).length) {
        throw new Error('Template Data should have at least one key-value pair!');
    }
};

export const prepareHtml = ({ html, templateData }: ActorInput) => {
    let finalHtml = html;

    Object.entries(templateData).forEach(([key, value]) => {
        finalHtml = finalHtml.replace(`{{${key}}}g`, value);
    });

    return finalHtml;
};
