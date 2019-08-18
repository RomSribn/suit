import * as  React from 'react';

export interface StylistInfoComponentProps {
    lang: Lang;
}

let StylistInfoComponent: React.FC<StylistInfoComponentProps> | React.ComponentClass<StylistInfoComponentProps> =
    () => null;

const salon = process.env.SALON_ID;

switch (salon) {
    case 'kalasova': {
        StylistInfoComponent = require('./StylistInfo.component.kalasova').StylistInfoComponent;
        break;
    }

    default: break;
}

export const StylistInfo = StylistInfoComponent;
