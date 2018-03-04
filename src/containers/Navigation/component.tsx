import * as React from 'react';
import * as classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';

import { routes } from '../../config/routes';
import { loc } from './loc';

interface HeaderProps {
    backgroundColor: string;
}
const Header = (props: HeaderProps) => {
    const {
        backgroundColor,
    } = props;
    return (
    <div className="navbar__header">
        <Link
            to={routes.index}
            className="navbar__header"
        >
            <img className="logo" src={process.env.STATIC_IMAGES + `logo-${backgroundColor}.svg`} />
        </Link>
    </div>
    );
};

interface FooterProps {
    lang: string;
}
class Footer extends React.PureComponent<FooterProps> {
    render() {
        const {
            lang,
        } = this.props;
        return (
            <div className="panel__footer">
                <div className="tools">
                    <button
                        className="btn tools__item tools__item--view"
                        title={loc[lang].hideShow}
                    />
                    <button className="btn tools__item tools__item--3d" title="3d">3d</button>
                </div>
            </div>
        );
    }
}

interface NavigationItemProps {
    linkName: string;
    lang: string;
}
class NavigationItem extends React.Component<NavigationItemProps> {
    render () {
        const {
            linkName,
            lang,
         } = this.props;
        return (
        <li>
            <NavLink
                activeClassName="active"
                className={classNames(
                    'main-menu__link ',
                    `main-menu__link--${linkName}`,
                    )}
                to={routes[linkName]}
            >
                <span>{loc[lang].navigation[linkName]}</span>
            </NavLink>
        </li>);
    }
}

type MakeNavigationLinks =
       (linkNames: string[],
        lang: string) => React.ReactElement<NavigationItemProps>[];
const makeNavigationLinks: MakeNavigationLinks = (linkNames, lang = 'en') => {
    return linkNames.map(name => (
        <NavigationItem
            key={name}
            linkName={name}
            lang={lang}
        />
    ));
};

interface NavigationProps {
    lang: string;
    backgroundColor: string;
}
const Navigation: React.StatelessComponent<NavigationProps> = (props) => {
    const {
        lang,
        backgroundColor,
    } = props;
    return (
    <div
        className={classNames(
            'navbar',
            {
                'navbar--white': backgroundColor === 'white',
            }
        )}
    >
        <Header backgroundColor={backgroundColor} />
        <div className="navbar__middle">
            <nav className={`main-menu`}>
                <ul>
                    {makeNavigationLinks(
                        Object.keys(loc[lang].navigation),
                        lang)}
                </ul>
            </nav>
        </div>
        <Footer lang={lang} />
    </div>);
};
Navigation.defaultProps = {
    lang: 'en',
};
export {
    Navigation,
};
