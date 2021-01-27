import * as React from 'react';
import { Route } from 'react-router';
import { LanguageControl } from '../../../components/LanguageContorl';
import { OrderControl } from '../OrederControl';
import { routes } from '../routes';

const Footer = (props: FooterProps) => (
  <div style={{ width: '100%', zIndex: 999 }}>
    <Route exact={true} path={routes.index} component={LanguageControl} />
    <Route path={routes.details} component={OrderControl} />
  </div>
);

export { Footer };
