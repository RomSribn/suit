import * as React from 'react';
import { Link } from 'react-router-dom';
import { PopUp } from '../../../containers/Popup';
import Login from '../../Login';
import './styles.styl';
import { isMobile } from '../../../utils';
import { routes } from '../../../config/routes';

const loginText = {
    en: 'Log In',
    ru: 'ВОЙТИ'
};

type State = { showLoginForm: boolean; };

class HeaderBar extends React.Component<HeaderBarProps, State> {
    constructor(props: HeaderBarProps) {
        super(props);
        this.state = {
            showLoginForm: false
        };
        // TODO: Разобраться какого хера при использвании стрелки теряется контекст
        this.profileLinkClick = this.profileLinkClick.bind(this);
    }
    profileLinkClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const {
            userStore,
            isAuth
        } = this.props;
        if (!isAuth) {
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
            lang
        } = this.props;
        const isRealIndexPage = window.location.pathname === routes.mainPage;
        const userName = userStore.profile ? userStore.profile.user : loginText[lang];
        const parsedUserName = userName.length > 10 ? `${userName.substring(0, 10)}…` : userName;
        return (
            <div className="main__bar">
                <Link
                    to="#"
                    style={isRealIndexPage ?
                        {
                            color: 'white',
                        } :
                        {}}
                    onClick={this.profileLinkClick}
                    className={`profile-link ${isRealIndexPage && 'profile-link--index-page-modify'}`}
                >
                    {!isMobile() && parsedUserName}
                </Link>
                <PopUp
                    open={this.state.showLoginForm}
                    onClose={this.closeForm}
                ><Login loginCallback={this.closeForm} closeForm={this.closeForm} />
                </PopUp>
            </div>);
    }
}

export {
    HeaderBar,
};
