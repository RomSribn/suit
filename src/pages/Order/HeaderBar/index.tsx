import * as React from 'react';
import { Link } from 'react-router-dom';

class HeaderBar extends React.PureComponent<HeaderBarProps> {
    render() {
        const {
            userName,
            showChopcard,
        } = this.props;
        return (
            <div className="main__bar">
                { showChopcard &&
                <Link
                    to=""
                    className="chopcard"
                    // title="В корзине 3 товара"
                >В корзине
                    <span
                        className="chopcard__calc"
                    >3
                    </span> товара
                </Link>
                }
                <Link to="" className="profile-link">{userName}</Link>
            </div>);
    }
}

export {
    HeaderBar,
};
