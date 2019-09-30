let text = '<main>\n' +
    '    <p>When I gave birth in early September, I knew it would change my life. What I wasn’t aware of, though, was just how much it would transform me and my daily life in every single way.</p>\n' +
    '    <p>Tending to my crying babe takes precedence over looking in the mirror. 30-minute showers have become swift splashes. Makeup doesn’t matter nearly as much. My skin care routine is less of a routine and more of an infrequent luxury.</p>\n' +
    '</main>\n' +
    '<footer>\n' +
    '    <p>&copy; Copyright 2008-2015</p>\n' +
    '    <p>All rights reserved. Powered by the Rainmarker Platform.</p>\n' +
    '</footer>';

const getTextWithoutTag = (text, tagName) => {
    const startTag = '<' + tagName;
    const endTag = '</' + tagName + '>';

    const startIndex = text.indexOf(startTag);
    const endIndex = text.indexOf(endTag, startIndex + 1);
    return text.replace(text.slice(startIndex, endIndex + endTag.length), '');
};

const getTextWithoutTags = (text, tagName) => {
    while (text.includes('<' + tagName)) {
        text = getTextWithoutTag(text, tagName);
    }

    return text;
};

console.log(getTextWithoutTags(text, 'p'));

