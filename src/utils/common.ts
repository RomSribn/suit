type ParseQuery = (searchQuery: string) => { [key: string]: string; };

/**
 * Парсит стрингу из запроса со стринговыми параметрами в объект
 * @param searchQuery - Параметры запроса
 * @example parseQuery('?param1=123&another=555') => { param1: 123, another: 555}
 */
const parseQuery: ParseQuery = (searchQuery) =>
    searchQuery.split(/(\?)|(&)/).reduce((acc, paramValue) => {
        if (paramValue) {
            const splitted = paramValue.split('=');
            if (splitted && splitted.length === 2) {
                acc[splitted[0]] = splitted[1];
            }
        }
        return acc;
    }, {});

export {
    parseQuery
};
