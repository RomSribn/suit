import * as React from 'react';
import { Link } from 'react-router-dom';
import * as classNames from 'classnames';
import { PopUp } from '../../../containers/Popup';
import Login from '../../../components/Login';

import './styles.styl';

const loginText = {
    en: 'login',
    ru: 'войти'
};

type State = { showLoginForm: boolean; };

class HeaderBar extends React.Component<HeaderBarDefaultProps, State> {
    constructor(props: HeaderBarDefaultProps) {
        super(props);
        this.state = {
            showLoginForm: false
        };
        // TODO: Разобраться какого хера при использвании стрелки теряется контекст
        this.profileLinkClick = this.profileLinkClick.bind(this);
    }
    profileLinkClick(e: React.MouseEvent) {
        e.preventDefault();
        const userStore = this.props.userStore;
        if (!userStore.isAuth) {
            this.setState({
                showLoginForm: true
            });
        } else {
            userStore.logout();
        }
    }
    
    closeForm = () => {
        this.setState({ showLoginForm: false });
    }

    render() {
        const {
            userStore,
            lang,
            setLang
        } = this.props as HeaderBarDefaultProps;
        const userName = userStore.profile ? userStore.profile.user : loginText[lang];
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
                <Link to="#" onClick={this.profileLinkClick} className="profile-link">{userName}</Link>
                <PopUp
                    open={this.state.showLoginForm}
                    onClose={this.closeForm}
                ><Login loginCallback={this.closeForm} />
                </PopUp>
            </div>);
    }
}

export {
    HeaderBar,
};
