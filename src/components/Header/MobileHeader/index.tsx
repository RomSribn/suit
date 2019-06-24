import * as React from 'react';
import { Breadcrumbs, Crumbs } from 'react-breadcrumbs';
import './style.styl';
import { isMobile } from '../../../utils';

type Props = {
  openMenu: () => void,
  title: string,
  setCrumbs: (crumbs: Crumbs) => React.ReactNode,
  lang: string
};

const baseLink = String(process.env.BASE_SERVICE_LINK);

export default ({ openMenu, title, setCrumbs, lang }: Props) => {
  return(
    <header className="headerWrapper">
      <button className="open-menu" onClick={openMenu}>
        <img src={process.env.STATIC_IMAGES + `./tools/black/menu-button.svg`} alt="" className="open-element-img" />
      </button>
      <main className="content-wrapper">
        <h2 className="menu-title">{title}</h2>
        <span>
          {/* Вставялем чтобы подхватились стили. Вообще похуй */}
          <span className="breadcrumbs">
              <a className="breadcrumbs__crumb" href={baseLink}>{lang === 'ru' ? 'главная' : 'main'}</a>
              <span className="breadcrumbs__separator"> /&nbsp;</span>
          </span>
            {!isMobile() && <Breadcrumbs className="breadcrumbs__wrapper" setCrumbs={setCrumbs} separator=" / " />}
        </span>
      </main>

      <img src={process.env.STATIC_IMAGES + `./tools/black/icn-3d.svg`} alt="" className="decorative-element-img" />
    </header>
  );
};
