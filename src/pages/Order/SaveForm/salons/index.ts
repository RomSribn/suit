import * as  React from 'react';

let SaveFormComponent: React.FC | React.ComponentClass<FormProps> = () => null;

const salon = process.env.SALON_ID;

switch (salon) {
    case 'gasuits': {
        SaveFormComponent = require('./gasuits').SaveForm;
        break;
    }
    case 'mysuit': {
        SaveFormComponent = require('./mysuit').SaveForm;
        break;
    }
    default: break;
}

export const SaveForm = SaveFormComponent;
