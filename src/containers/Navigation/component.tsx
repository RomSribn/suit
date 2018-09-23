import * as React from 'react';
import * as classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Footer } from './Footer';
import { TRANSITION_DUARAION } from '../../config/constants';

import { navigationRoutes as routes } from '../../config/routes';
import { loc } from './loc';

interface HeaderProps {
}
const Header = (props: HeaderProps) => {
    return (
    <div className="navbar__header">
        <Link
            to={routes.index}
            className="navbar__header"
        >
            <img className="logo" src={process.env.STATIC_IMAGES + `logo-white.svg`} />
        </Link>
    </div>
    );
};

interface NavigationItemProps {
    linkName: string;
    lang: string;
    showActiveClassName: boolean;
}
class NavigationItem extends React.Component<NavigationItemProps> {
    render () {
        const {
            linkName,
            lang,
            showActiveClassName,
         } = this.props;
        return (
        <li>
            <NavLink
                activeClassName={showActiveClassName ? 'active' : ''}
                className={classNames(
                    'main-menu__link ',
                    `main-menu__link--${linkName}`,
                    )}
                to={routes[linkName]}
            >
            <ReactCSSTransitionGroup
                transitionName="fade-in-absolute" 
                transitionEnterTimeout={TRANSITION_DUARAION}
                transitionLeaveTimeout={TRANSITION_DUARAION}
            >
                <span key={lang}>{loc[lang].navigation[linkName]}</span>
            </ReactCSSTransitionGroup>

            </NavLink>
        </li>);
    }
}

type MakeNavigationLinks =
       (linkNames: string[],
        showActiveClassName: boolean,
        lang: string) => React.ReactElement<NavigationItemProps>[];
const makeNavigationLinks: MakeNavigationLinks = (linkNames, showActiveClassName, lang = 'en') => {
    return linkNames.map(name => (
        <NavigationItem
            key={name}
            linkName={name}
            showActiveClassName={showActiveClassName}
            lang={lang}
        />
    ));
};

interface NavigationProps {
    isLogin?: boolean;
    lang: string;
    isOrderPage: boolean;
}
interface NavigationState {
    showActiveClassName: boolean;
}
class Navigation extends React.Component<NavigationProps, NavigationState> {
    static defaultProps = {
        lang: 'en',   
    };
    constructor(props: NavigationProps) {
        super(props);
        this.state = {
            showActiveClassName: true,
        };
    }
    mouseEnter = () => {
        this.setState({
            showActiveClassName: false,
        });
    }
    mouseLeave = () => {
        this.setState({
            showActiveClassName: true,
        });
    }
    
    render() {
        const {
            lang,
            isLogin,
            isOrderPage
        } = this.props;
        return (
        <div
            className={classNames(
                'navbar',
                {
                    'navbar--white': true,
                    'navbar--transparent': isOrderPage
                }
            )}
        >
            <Header />
            {isLogin &&
                <div className="navbar__middle">
                    <nav
                        className={`main-menu`}
                        onMouseEnter={this.mouseEnter}
                        onMouseLeave={this.mouseLeave}
                    >
                        <ul>
                            {makeNavigationLinks(
                                Object.keys(loc[lang].navigation),
                                this.state.showActiveClassName,
                                lang)}
                        </ul>
                    </nav>
                </div>
            }
            <Footer lang={lang}/>
        </div>);
    }
}

export {
    Navigation,
};
