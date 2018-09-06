import * as React from 'react';
import { HeaderBar } from '../HeaderBar';
import { HeaderContent } from '../HeaderContent';

class Header extends React.PureComponent<HeaderProps> {
    static defaultProps = {
        userName: undefined,
    };
    render() {
        const {
            path
        } = this.props;
        return (
            <div className="main__header">
                <HeaderBar />
                <HeaderContent path={path!} />
            </div>);
    }
}

export {
    Header,
};