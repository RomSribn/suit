import * as React from 'react';
import * as classNames from 'classnames';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { TRANSITION_DUARAION } from '../../config/constants';
import { loc, Languages } from './loc';

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
        changeLanguage: () => {}, // tslint:disable-line
    };
    render() {
        const {
            lang,
            changeLanguage,
         } = this.props;
        const languagesList = Object.keys(loc.en.languages);
        return (
            <ReactCSSTransitionGroup
                transitionName="fade-in-absolute"
                transitionEnterTimeout={TRANSITION_DUARAION}
                transitionLeaveTimeout={TRANSITION_DUARAION}
            >
                <div
                    key={lang}
                    className="lang-menu"
                    style={{
                        width: 250,
                        bottom: 0,
                        right: 0,
                    }}
                >
                    {makeLanguageItems(
                        languagesList,
                        loc[lang!].languages,
                        lang!,
                        changeLanguage!)}
                    <div className="lang-menu__line" />
                    <div className="lang-menu__text">{loc[lang!].language}</div>
                </div>
            </ReactCSSTransitionGroup>

        );
    }
}

export {
    LanguageControl,
};