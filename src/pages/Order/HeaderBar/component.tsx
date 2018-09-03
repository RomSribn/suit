import * as React from 'react';
import { Link } from 'react-router-dom';
import * as classNames from 'classnames';
import './styles.styl';

class HeaderBar extends React.PureComponent<HeaderBarDefaultProps> {
    render() {
        const {
            userName,
            lang,
            setLang
        } = this.props as HeaderBarDefaultProps;
        return (
            <div className="main__bar">
                <span className="language-controll" >
                    <span
                        className={classNames('language-controll__item', {active: lang === 'ru'})}
                        onClick={() => setLang('ru')}
                    >RU
                    </span>
                    <span
                        className={classNames('language-controll__item', {active: lang === 'en'})}
                        onClick={() => setLang('en')}
                    >EN
                    </span>
                </span>
                <Link to="" className="profile-link">{userName}</Link>
            </div>);
    }
}

export {
    HeaderBar,
};
