let tagInput = '' +
    '<fieldset>\n' +
    '    <legend>Input HTML</legend>\n' +
    '    <label>Paste HTML code here</label>\n' +
    '    <textarea rows="20" cols="200" id="html-input"></textarea>\n' +
    '    <input id="tag-input"/>\n' +
    '    <button id="add-tag">Add tag</button>\n' +
    '    <select id="tags"></select>\n' +
    '    <button id="remove-tag">Remove tag</button>\n' +
    '    <br/>\n' +
    '    <button id="remove-tags">Remove Tags</button>\n' +
    '</fieldset>';

const getTextWithoutTag = (text, tagName) => {
    const regex = new RegExp('<\\/?' + tagName + '[^>]*>', 'gi');
    return text.replace(regex, '');
};

const getTextWithoutTags = (text, tagNames) => {
    tagNames.forEach(tagName => {
        text = getTextWithoutTag(text, tagName);
    });

    return text;
};

console.log(getTextWithoutTags(tagInput, ['fieldset', 'button']));
