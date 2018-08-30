import  { navigationRoutes, services, routes } from './_routes';
import { routesTranslations } from './loc';

export const trim = (s: string, c: string): string => {
    if (c === ']') { c = '\\]'; }
    if (c === '\\') { c = '\\\\'; }
    return s.replace(new RegExp(
      '^[' + c + ']+|[' + c + ']+$', 'g'
    ), '');
  };
  
const _API_ROOT = trim(process.env.API_ROOT || '', '/');
const API_ROOT =
    _API_ROOT.indexOf('https://') === 0
        ? _API_ROOT
        : _API_ROOT.indexOf('http://') === 0
            ? _API_ROOT
            : `http://${_API_ROOT}`;
  
export {
    navigationRoutes,
    routesTranslations,
    routes,
    API_ROOT,
    services
  };
  