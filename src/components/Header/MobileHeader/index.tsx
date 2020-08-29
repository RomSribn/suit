import * as React from 'react';
import * as classnames from 'classnames';
import { Route, Switch, RouteComponentProps } from 'react-router';
import { routes } from '../../../pages/Order/routes';
import { routes as configRoutes } from '../../../config/routes';
import { mobileHeaderTranslations } from './loc';
import './style.styl';
import { Navlinks } from '../HeaderContent/navlinks';

type Props = {
    openMenu: () => void;
    lang: Lang;
    isLandscape: boolean;
};

type Group = 'design' | 'fabric_ref' | 'fitting';

const makeNavLinkItem = (active: boolean) => (
    <span
        className={
            classnames(
                'navlinks-mobile__item',
                active && '_active'
            )}
    />
);

export default ({ openMenu, lang, isLandscape }: Props) => {
    return (
        <header className="headerWrapper">
            <button className="open-menu" onClick={openMenu}>
                <img
                    src={process.env.STATIC_IMAGES +
                        `./tools/${window.location.pathname === '/order' ? 'white' : 'black'}/menu-button.svg`}
                    alt=""
                    className="open-element-img"
                />
            </button>
            <main style={{ display: 'none' }} className="content-wrapper">
                <h2 className="menu-title">
                    {isLandscape ? <Navlinks /> : (
                        <>
                            <Switch>
                                <Route
                                    path={routes.fabric}
                                    component={() =>
                                        <span className="navlinks-mobile__value">
                                            {mobileHeaderTranslations[lang].fabric}
                                        </span>}
                                />
                                <Route
                                    path={routes.design}
                                    component={() =>
                                        <span className="navlinks-mobile__value">
                                            {mobileHeaderTranslations[lang].design}
                                        </span>}
                                />
                                <Route
                                    path={routes.fitting}
                                    component={() =>
                                        <span
                                            className="navlinks-mobile__value"
                                        >
                                            {mobileHeaderTranslations[lang].fitting}
                                        </span>
                                    }
                                />
                                <Route
                                    path={configRoutes.orderList}
                                    component={() =>
                                        <span className="navlinks-mobile__value">
                                            {mobileHeaderTranslations[lang].orderList}
                                        </span>}
                                />
                                <Route
                                    path={configRoutes.customersList}
                                    component={() =>
                                        <span className="navlinks-mobile__value">
                                            {mobileHeaderTranslations[lang].customersList}
                                        </span>}
                                />
                            </Switch>

                            <Route
                                path={routes.groupChoice}
                                component={
                                    (props: RouteComponentProps<{ group: Group }>) => {
                                        return (
                                            <div className="navlinks-mobile__container">
                                                {makeNavLinkItem(props.match.params.group === 'fabric_ref')}
                                                {makeNavLinkItem(props.match.params.group === 'design')}
                                                {makeNavLinkItem(props.match.params.group === 'fitting')}
                                            </div>
                                        );
                                    }}
                            />
                        </>
                    )}
                </h2>
            </main>

            <img
                src={process.env.STATIC_IMAGES + `./tools/black/icn-3d.svg`}
                alt=""
                className="decorative-element-img"
            />
        </header>
    );
};
