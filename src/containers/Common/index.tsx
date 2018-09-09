import * as React from 'react';
import { inject, observer } from 'mobx-react';
// import { Paralax } from '../../components/OrderDecorationBlocks';
import { Navigation } from '../Navigation';

interface CommonProps {
    children?: React.ReactChildren;
    userStore?: IUserStore;
}

@inject(({ user }) => ({
    userStore: user
}))
@observer
class Common extends React.PureComponent<CommonProps> {
    render() {
        const userStore = this.props.userStore!;
        return (
            <div className="application" >
                {/* <Paralax /> */}
                { window.location.pathname !== '/login' &&
                    userStore.isAuth &&
                    <Navigation />
                }
                {this.props.children}
            </div>
        );
    }
}

export {
    Common,
};
