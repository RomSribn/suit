import * as React from 'react';
import { Breadcrumbs, Crumbs } from 'react-breadcrumbs';
import { Navlinks } from './navlinks';

const baseLink = String(process.env.BASE_SERVICE_LINK);

class HeaderContent extends React.Component<HeaderContentProps, {pageTitle?: string}> {
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

    setCrumbs = (crumbs: Crumbs) => {
        const {
            pageTitle
        } = this.state;
        if (crumbs && crumbs[0] && pageTitle !== crumbs[0].title) {
            this.setState({ pageTitle: crumbs && crumbs[0] && crumbs[0].title });
        }
        return crumbs;
    }

    render() {
        const {
            pageTitle
        } = this.state;
        const props = this.props;
        return (
        <div
            className="main__header-content"
            style={HeaderContent.style}
        >
            {pageTitle && (
                <h1 className="main__header-title">
                    <Navlinks isAuth={props.isAuth} />
                </h1>
            )}
            <span>
                {/* Вставялем чтобы подхватились стили. Вообще похуй */}
                <span className="breadcrumbs">
                    <a className="breadcrumbs__crumb" href={baseLink}>{props.lang === 'ru' ? 'главная' : 'main'}</a>
                    <span className="breadcrumbs__separator"> /&nbsp;</span>
                </span>

                <Breadcrumbs className="breadcrumbs__wrapper" setCrumbs={this.setCrumbs} separator=" / " />
            </span>
        </div>);
    }
}

export {
    HeaderContent,
};
