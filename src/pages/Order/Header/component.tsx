import * as React from 'react';
import { HeaderBar } from '../HeaderBar';
import { HeaderContent } from '../HeaderContent';

class Header extends React.PureComponent<HeaderProps> {
    static defaultProps = {
        userName: 'defautl username',
    };
    render() {
        const {
            userName,
            path,
        } = this.props;
        return (
            <div className="main__header">
                <HeaderBar userName={userName} showChopcard={path !== '/order'} />
                <HeaderContent path={path!} />
            </div>);
    }
}

export {
    Header,
};