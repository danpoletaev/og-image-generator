import { ActorInput } from './types.js';

/**
 * Validates Input provided by user
 * @throws Will throw an error if input is null,
 * or it does not contain html/templateData or if templateData does not have any keys. (It does not make sense to generate OG image without dynamic values)
 */
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

/**
 * Prepares HTML template by replacing keys from templateData(provided by user)
 * @returns {String} Returns prepared HTML
 */
export const prepareHtml = ({ html, templateData }: ActorInput) => {
    let finalHtml = html;

    Object.entries(templateData).forEach(([key, value]) => {
        finalHtml = finalHtml.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });

    return finalHtml;
};
