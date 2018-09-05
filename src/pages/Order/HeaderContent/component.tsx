import * as React from 'react';
import { Link } from 'react-router-dom';
import { loc } from './loc';

type MakePath = (orderPath: OrderPath, f: (link: string) => void) => React.ReactNode[];
const makePath: MakePath = (path, f) => {
    const className = '';
    return path.map((item, i) => (
        i === path.length - 1
            ? null
            : item.link
            ? (
                <Link
                    onClick={() => { f(item.value); }}
                    className={className}
                    key={item.link + item.value}
                    to={item.link || ''}
                >{item.value} / 
                </Link>)
            : <span className={className} key={item.link + item.value}>{item.value}/</span>
    ));
}; 

class HeaderContent extends React.Component<HeaderContentProps> {
    static defaultProps = {
        lang: 'en',
        orderPath: [],
        cutOrderPath: (value: string) => undefined,
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
    render() {
        const {
            orderPath,
            cutOrderPath,
            lang,
        } = this.props;
        const currentSectionName = orderPath![orderPath!.length - 1].value;
        const isOrderPage = currentSectionName === loc[lang!].order;
        return (
        <div
            className="main__header-content"
            style={HeaderContent.style}
        >
            <h1 className="main__header-title">
                <span>{loc[lang!].order}</span>
                { !isOrderPage &&
                    <span>&nbsp;&nbsp;<i>|</i>&nbsp;&nbsp;</span>
                }
                {isOrderPage ? '' : currentSectionName}
            </h1>
            <nav className="breadcrumbs">
                {makePath(orderPath!, cutOrderPath!)}
            </nav>
        </div>);
    }
}

export {
    HeaderContent,
};