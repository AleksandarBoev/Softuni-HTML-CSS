const example = '<div class="_hj-f5b2a1eb-9b07_feedback_content_dimmer" id="_hj-f5b2a1eb-9b07_feedback_content_dimmer_left"\n' +
    '                 data-show-for="desktop"></div>';

const attributeToRemove = 'id';

const getTextWithoutAttribute = (text, attributeName) => {
    const regex = new RegExp(attributeName + '="[^"]+"');
    return text.replace(regex, '');
};

const getTextWithoutAttributes = (text, attributeNames) => {
    attributeNames.forEach(attributeName => {
        text = getTextWithoutAttribute(text, attributeName);
    });

    return text;
};

console.log(getTextWithoutAttributes(example, ['class', 'id']));
