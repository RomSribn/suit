import * as React from 'react';
import * as classNames from 'classnames';
import { loc, Languages } from './loc';

import './styles.styl';
import { isMobile } from '../../utils';

type MakeLanguageItems = (
    list: string[],
    locale: Languages,
    currentLang: string,
    changeLanguage: ChangeLanguage) => React.ReactNode[];
const makeLanguageItems: MakeLanguageItems = (
    langList,
    locale,
    currentLang,
    changeLanguage) => langList
        .map((lang: string) => (
            <a
                href="#"
                onClick={changeLanguage(lang)}
                className={classNames(
                    'lang-menu__link',
                    {
                        active: lang === currentLang,
                    },
                )}
                key={lang}
            >
                {locale[lang]}
            </a>
        ));

class LanguageControl extends React.PureComponent<LanguageControlProps> {
    static defaultProps = {
        lang: 'en',
        changeLanguage: () => { }, // tslint:disable-line
        theme: 'white'
    };
    render() {
        const {
            lang,
            changeLanguage,
            className,
            mobileOnly,
            shortcut,
            theme
        } = this.props;
        const languagesList = Object.keys(loc.en.languages);
        return (
            <div
                style={isMobile() && window.location.pathname === '/order' ? { display: 'none' } : {}}
                className={
                    classNames(
                        className,
                        'lang-menu',
                        theme,
                        {
                            ['mobile-only']: mobileOnly,
                            shortcut
                        }
                    )
                }
            >
                {makeLanguageItems(
                    languagesList,
                    shortcut ? loc[lang!].languagesShortcut : loc[lang!].languages,
                    lang!,
                    changeLanguage!)}
            </div>
        );
    }
}

export {
    LanguageControl,
};
