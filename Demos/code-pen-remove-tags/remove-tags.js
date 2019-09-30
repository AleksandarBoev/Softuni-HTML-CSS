(() => {
    const elements = {
        htmlInput: document.getElementById('html-input'),

        tagInput: document.getElementById('tag-input'),
        addTagButton: document.getElementById('add-tag'),
        tagsSelect: document.getElementById('tags'),
        excludeTagButton: document.getElementById('exclude-tag'),

        tagInputBetween: document.getElementById('tag-input-between'),
        addTagBetweenButton: document.getElementById('add-tag-between'),
        tagsBetweenSelect: document.getElementById('tags-between'),
        excludeTagBetweenButton: document.getElementById('exclude-tag-between'),

        attributeInput: document.getElementById('attribute-input'),
        addAttributeButton: document.getElementById('add-attribute'),
        attributesSelect: document.getElementById('attributes'),
        excludeAttributeButton: document.getElementById('exclude-attribute'),

        generateHtmlButton: document.getElementById('generate'),
        htmlOutput: document.getElementById('html-output'),
        copyButton: document.getElementById('copy'),
    };

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

        const getHtmlWithoutTagsAndBetween = (text, tagNames) => {
            tagNames.forEach(tagName => {
                while (text.includes('<' + tagName)) {
                    text = getHtmlWithoutTagAndBetween(text, tagName);
                }
            });
            //TODO problem: only closing tags remain in some places
            //could be because the "text" variable can hold only 255 characters at once
            //and so the replacements can't be done
            return text;
        };

        const getHtmlWithoutAttribute = (text, attributeName) => {
            const regex = new RegExp(attributeName + '="[^"]*"', 'gi'); //TODO
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

    const inputValueToSelect = (inputElement, selectElement) => {
        if (inputElement.value === '') {
            return;
        }
        const newOption = document.createElement('option');
        newOption.textContent = inputElement.value;
        inputElement.value = '';

        selectElement.appendChild(newOption);
    };

    elements.addTagButton.addEventListener('click', () => {
        inputValueToSelect(elements.tagInput, elements.tagsSelect);
    });

    elements.excludeTagButton.addEventListener('click', () => {
        elements.tagsSelect.options[elements.tagsSelect.selectedIndex].remove();
    });

    elements.addTagBetweenButton.addEventListener('click', () => {
        inputValueToSelect(elements.tagInputBetween, elements.tagsBetweenSelect);
    });

    elements.excludeTagBetweenButton.addEventListener('click', () => {
        elements.tagsBetweenSelect.options[elements.tagsBetweenSelect.selectedIndex].remove();
    });

    elements.addAttributeButton.addEventListener('click', () => {
        inputValueToSelect(elements.attributeInput, elements.attributesSelect);
    });

    elements.excludeAttributeButton.addEventListener('click', () => {
        elements.attributesSelect.options[elements.attributesSelect.selectedIndex].remove();
    });

    const getArrayOfStrings = selectElement => [...selectElement.children].map(child => child.textContent);

    elements.generateHtmlButton.addEventListener('click', () => {
        const tagsToRemove = getArrayOfStrings(elements.tagsSelect);
        const tagsBetweenToRemove = getArrayOfStrings(elements.tagsBetweenSelect);
        const attributes = getArrayOfStrings(elements.attributesSelect);

        let html = elements.htmlInput.value;

        html = htmlModifiers.getHtmlWithoutTags(html, tagsToRemove);
        html = htmlModifiers.getHtmlWithoutTagsAndBetween(html, tagsBetweenToRemove);
        html = htmlModifiers.getHtmlWithoutAttributes(html, attributes);

        elements.htmlOutput.value = html;
    });

    elements.copyButton.addEventListener('click', () => {
        elements.htmlOutput.select();
        document.execCommand('copy');
        alert('Copied to clipboard')
    });
})();

