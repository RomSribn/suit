import * as React from 'react';
import { NavlinksItemComponent } from './NavlinksItem.component';
import { routes } from '../../../../pages/Order/routes';

import './Navlinks.styles.styl';
import { loc } from '../loc';

interface NavlinksComponentProps {
    isAuth?: boolean;
    garment: string;
    lang: string;
}

const NavlinksComponent: React.FunctionComponent<NavlinksComponentProps> = ({ isAuth, garment, lang }) => {
    const garmentSet = (link: string) => link.replace(':garment', garment);
    return (
        <div className="navlinks__container">
            <NavlinksItemComponent to={garmentSet(routes.fabric)}>
                {loc[lang].cloth}
            </NavlinksItemComponent>
            <NavlinksItemComponent to={garmentSet(routes.design)}>
                {loc[lang].design}
            </NavlinksItemComponent>
            <NavlinksItemComponent to={garmentSet(routes.fitting)}>
                {loc[lang].metrics}
            </NavlinksItemComponent>
        </div>
    );
};

export {
    NavlinksComponent as Navlinks,
    NavlinksComponentProps,
};
