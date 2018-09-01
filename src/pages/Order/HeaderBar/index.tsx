import * as React from 'react';
import { Link } from 'react-router-dom';

class HeaderBar extends React.PureComponent<HeaderBarProps> {
    render() {
        const {
            userName
        } = this.props;
        return (
            <div className="main__bar">
                <Link to="" className="profile-link">{userName}</Link>
            </div>);
    }
}

export {
    HeaderBar,
};
