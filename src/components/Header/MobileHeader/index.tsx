import * as React from 'react';
import * as classnames from 'classnames';
import { Route, Switch, RouteComponentProps } from 'react-router';
import { routes } from '../../../pages/Order/routes';
import { mobileHeaderTranslations } from './loc';
import './style.styl';

type Props = {
  openMenu: () => void;
  lang: Lang;
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

export default ({ openMenu, lang }: Props) => {
  return(
    <header className="headerWrapper">
      <button className="open-menu" onClick={openMenu}>
        <img src={process.env.STATIC_IMAGES + `./tools/black/menu-button.svg`} alt="" className="open-element-img" />
      </button>
      <main className="content-wrapper">
        <h2 className="menu-title">
            <Switch>
                <Route
                    path={routes.fabric}
                    component={() =>
                        <span className="navlinks-mobile__value">{mobileHeaderTranslations[lang].fabric}</span>}
                />
                <Route
                    path={routes.design}
                    component={() =>
                        <span className="navlinks-mobile__value">{mobileHeaderTranslations[lang].design}</span>}
                />
                <Route
                    path={routes.fitting}
                    component={() =>
                        <span className="navlinks-mobile__value">{mobileHeaderTranslations[lang].fitting}</span>}
                />
            </Switch>

            <Route
                path={routes.groupChoice}
                component={
                    (props: RouteComponentProps<{group: Group}>) => {
                        return (
                            <div className="navlinks-mobile__container">
                                {makeNavLinkItem(props.match.params.group === 'fabric_ref')}
                                {makeNavLinkItem(props.match.params.group === 'design')}
                                {makeNavLinkItem(props.match.params.group === 'fitting')}
                            </div>
                        );
                    }}
            />
        </h2>
      </main>

      <img src={process.env.STATIC_IMAGES + `./tools/black/icn-3d.svg`} alt="" className="decorative-element-img" />
    </header>
  );
};
