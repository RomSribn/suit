/**
 * Парсит стрингу из запроса со стринговыми параметрами в объект
 * @param searchQuery - Параметры запроса
 * @example parseQuery('?param1=123&another=555') => { param1: 123, another: 555}
 */
function parseQuery(searchQuery: string): { [key: string]: string } {
  return searchQuery.split(/(\?)|(&)/).reduce((acc, paramValue) => {
    if (paramValue) {
      const splitted = paramValue.split('=');
      if (splitted && splitted.length === 2) {
        acc[splitted[0]] = splitted[1];
      }
    }
    return acc;
  }, {});
}

/**
 *
 * Figure out, if user swiping top->bottom ( down ) or bottom->top ( up )
 * @param {React.TouchEvent<HTMLInputElement>} event
 * @param {number} initialTouch
 * @param {(isCover: boolean) => void} callback
 */
const setCoverByTouchEnd = (
  event: React.TouchEvent<HTMLInputElement>,
  initialTouch: number,
  callback: (isCover: boolean) => void,
) => {
  if (event.changedTouches[0].clientY - initialTouch < -10) {
    callback(!!(event.changedTouches[0].clientY < initialTouch));
  }

  if (event.changedTouches[0].clientY - initialTouch > 10) {
    callback(!!(event.changedTouches[0].clientY < initialTouch));
  }
};

export { parseQuery, setCoverByTouchEnd };
