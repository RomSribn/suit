import { listeners } from './globalListeners';

const html = document!.querySelector('html')!;

let windowHeight = html.offsetHeight;
let windowWidth = html.offsetWidth;

let getWindowHeight = () => html.offsetHeight;
let getWindowWidth = () => html.offsetWidth;

export let isLandscape = () => getWindowWidth() / getWindowHeight() > 1;
export let isLandscapeInitial = windowWidth / windowHeight > 1;

html.setAttribute('orientation', isLandscape() ? 'landscape' : 'portrait');

const resizer = () => {
  windowHeight = html.offsetHeight;
  windowWidth = html.offsetWidth;
  const prevIsLandscape = isLandscapeInitial;

  isLandscapeInitial = windowWidth / windowHeight > 1;
  if (isLandscapeInitial !== prevIsLandscape) {
    html.setAttribute(
      'orientation',
      isLandscapeInitial ? 'landscape' : 'portrait',
    );
  }
};

listeners.resize.subscribe(resizer);

export const getOffset = (el: Element | null) => {
  const rect = el!.getBoundingClientRect();
  return { top: rect.top, left: rect.left };
};

export function callList(funcs: (() => void)[]) {
  funcs.forEach((func) => func());
}

export const isMobile = () =>
  html.offsetWidth <= 450 || html.offsetHeight <= 450;

export const isTablet = () =>
  html.offsetWidth <= 768 || html.offsetHeight <= 768;

// use accurate because it is also a normal pc resolution
export const isIpadPro = () =>
  navigator.userAgent.match(/iPad/i) != null &&
  (html.offsetWidth <= 1366 || html.offsetHeight <= 1366);

export const checkIfMobile = () => {
  const threshold = isLandscape() ? 650 : 450;
  return windowWidth <= threshold || windowHeight <= threshold;
};

export * from './globalListeners';
