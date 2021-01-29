import * as React from 'react';
import { translations } from './SylesInfo.loc.kalasova';
import { StylistInfoComponentProps } from './index';

const img = require('./profile.jpg');

const StylistInfoComponent: React.FC<StylistInfoComponentProps> = (props) => (
  <div className="styles-info__container">
    <h1 className="styles-info__header">
      <img className="styles-info__header-image" src={img} alt="" />
      <div>{translations[props.lang].header.yourStylist}</div>
    </h1>
    <div className="styles-info__content">
      <div>{translations[props.lang].header.waitForIt}</div>
    </div>
  </div>
);

export { StylistInfoComponent };
