import * as React from 'react';
import { NavlinksItemComponent } from './NavlinksItem.component';
import { routes } from '../../../../pages/Order/routes';

import './Navlinks.styles.styl';

interface NavlinksComponentProps {
    isAuth?: boolean;
}

const NavlinksComponent: React.FunctionComponent<NavlinksComponentProps> = (props) => {
    return (
        <div className="navlinks__container">
            <NavlinksItemComponent to={routes.fabric}>
                ткань
            </NavlinksItemComponent>
            <NavlinksItemComponent to={routes.design}>
                дизайн
            </NavlinksItemComponent>
            <NavlinksItemComponent to={routes.fitting} forbidden={!props.isAuth}>
                мерки
            </NavlinksItemComponent>
        </div>
    );
};

export {
    NavlinksComponent as Navlinks,
    NavlinksComponentProps,
};
