import * as React from 'react';
import { findKey } from 'lodash';
import { Navlinks } from './navlinks';
import { navigationRoutes, routesTranslations } from '../../../config/routes';
import { routes } from '../../../config/routes';

class HeaderContent extends React.Component<HeaderContentProps, { pageTitle?: string }> {
    static defaultProps = {
        lang: 'en',
    };
    static indexStyle = {
        position: 'relative' as 'relative',
        marginTop: 'calc(50vh - 3rem - 9.1333rem - 3rem)',
        fontSize: '1.6rem',
        marginBottom: '.4666rem',
    };
    static style = {
        position: 'relative' as 'relative',

        fontSize: '100%',
        marginBottom: 0,
    };

    constructor(props: HeaderContentProps) {
        super(props);
        this.state = {

        };
    }

    render() {
        const {
        } = this.state;
        const { path, lang, isAuth } = this.props;
        const routeName = findKey(navigationRoutes, v => v === path) || '';
        const isRealIndexPage = path === routes.mainPage;
        return (
            <div
                className="main__header-content"
                style={HeaderContent.style}
            >
                <h1 className="main__header-title">
                    {path.includes('/order/details') ?
                        <Navlinks isAuth={isAuth} /> :

                        !isRealIndexPage && <span className="header-text">
                            {routesTranslations[lang][routeName]}
                        </span>}
                </h1>
            </div>);
    }
}

export {
    HeaderContent,
};
