const htmlModifiers = (() => {
    const getHtmlWithoutTag = (text, tagName) => {
        const regex = new RegExp('<\\/?' + tagName + '[^>]*>', 'gi');
        return text.replace(regex, '');
    };

    const getHtmlWithoutTags = (text, tagNames) => {
        tagNames.forEach(tagName => {
            text = getHtmlWithoutTag(text, tagName);
        });

        return text;
    };

    const getHtmlWithoutTagAndBetween = (text, tagName) => {
        const startTag = '<' + tagName;
        const endTag = '</' + tagName + '>';

        const startIndex = text.indexOf(startTag);
        const endIndex = text.indexOf(endTag, startIndex + 1);
        return text.replace(text.slice(startIndex, endIndex + endTag.length), '');
    };

    const getHtmlWithoutTagsAndBetween = (text, tagName) => {
        while (text.includes('<' + tagName)) {
            text = getHtmlWithoutTagAndBetween(text, tagName);
        }

        return text;
    };

    const getHtmlWithoutAttribute = (text, attributeName) => {
        const regex = new RegExp(attributeName + '="[^"]+"');
        return text.replace(regex, '');
    };

    const getHtmlWithoutAttributes = (text, attributeNames) => {
        attributeNames.forEach(attributeName => {
            text = getHtmlWithoutAttribute(text, attributeName);
        });

        return text;
    };

    return {
        getHtmlWithoutTag,
        getHtmlWithoutTags,
        getHtmlWithoutTagAndBetween,
        getHtmlWithoutTagsAndBetween,
        getHtmlWithoutAttribute,
        getHtmlWithoutAttributes,
    }
})();