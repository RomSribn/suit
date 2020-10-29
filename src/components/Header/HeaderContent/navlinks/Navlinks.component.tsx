import * as React from 'react';
import { NavlinksItemComponent } from './NavlinksItem.component';
import { routes } from '../../../../pages/Order/routes';

import './Navlinks.styles.styl';

interface NavlinksComponentProps {
    isAuth?: boolean;
    garment: string;
}

const NavlinksComponent: React.FunctionComponent<NavlinksComponentProps> = ({ isAuth, garment }) => {
    const garmentSet = (link: string) => link.replace(':garment', garment);
    return (
        <div className="navlinks__container">
            <NavlinksItemComponent to={garmentSet(routes.fabric)}>
                ткань
            </NavlinksItemComponent>
            <NavlinksItemComponent to={garmentSet(routes.design)}>
                дизайн
            </NavlinksItemComponent>
            <NavlinksItemComponent to={garmentSet(routes.fitting)} forbidden={!isAuth}>
                мерки
            </NavlinksItemComponent>
        </div>
    );
};

export {
    NavlinksComponent as Navlinks,
    NavlinksComponentProps,
};
