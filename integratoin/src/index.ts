(function() {
    const searchString = location.search.substring(1);
    const searchPairs = searchString.split('&');

    const searchObject = searchPairs.reduce((acc, pair) => {
        const splittted = pair.split('=');
        const key = splittted[0];
        const val = splittted[1];
        acc[key] = val;
        return acc;
    }, {fiberClass : null, fiberId: null});

    const selector =
        (searchObject.fiberId && `#${searchObject.fiberId}`) ||
        (searchObject.fiberClass && `.${searchObject.fiberClass}`) ||
        '.fiber__wrapper';

    const element = document.querySelector(selector);

    if (!element) {
        throw Error(`No HTML container based on Fiber selector ${selector}`);
    }

    const linkElement = document.createElement('a');
    const link = `http://194.87.239.90?from=${location.hostname}`;

    linkElement.setAttribute('href', link);
    linkElement.setAttribute('target', 'blank');

    linkElement.innerText = 'создать рубашку';

    element.appendChild(linkElement);
})();