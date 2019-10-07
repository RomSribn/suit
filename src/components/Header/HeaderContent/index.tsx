import * as React from 'react';
import { Navlinks } from './navlinks';

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

    render() {
        const {
        } = this.state;
        const props = this.props;
        return (
        <div
            className="main__header-content"
            style={HeaderContent.style}
        >
            <h1 className="main__header-title">
                <Navlinks isAuth={props.isAuth} />
            </h1>
        </div>);
    }
}

export {
    HeaderContent,
};
