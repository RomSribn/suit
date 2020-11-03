import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { SaveButton } from '../../../../pages/Order/FooterBar/SaveButton';

interface NavlinksItem {
    to: string;
    className?: string;
    forbidden?: boolean;
}

const NavlinksItemComponent: React.FunctionComponent<NavlinksItem> = (props) => {
    const className = 'navlinks__item ' + (props.className ? props.className : '');

    if (props.forbidden) {
        return <SaveButton className={className}>{props.children}</SaveButton>;
    }
    return (
    <NavLink
        className={className}
        to={props.to}
        activeClassName="_active"
    >
        {props.children}
    </NavLink>);
};

export { NavlinksItemComponent };
