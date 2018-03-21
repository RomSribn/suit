import * as React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../../config/routes';

type MakePath = (orderPath: OrderPath) => React.ReactNode[];
const makePath: MakePath = (path) => {
    const className = '';
    return path.map(item => (
        item.link
            ? <Link className={className} key={item.link + item.value} to={item.link || ''}>{item.value} / </Link>
            : <span className={className} key={item.link + item.value}>{item.value}/</span>
    ));
}; 

class HeaderContent extends React.PureComponent<HeaderContentProps> {
    static defaultProps = {
        lang: 'en',
        orderPath: [],
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
            path,
            orderPath,
        } = this.props;
        return (
        <div
            className="main__header-content"
            style={path === routes.order ? HeaderContent.indexStyle : HeaderContent.style}
        >
            <h1 className="main__header-title">
                <span>заказать</span>&nbsp;&nbsp;<i>|</i>&nbsp;&nbsp;сорочка
            </h1>
            <nav className="breadcrumbs">
                {makePath(orderPath!)}
                {/* <Link to={routes.index}>Главная</Link> /
                <Link to={routes.order}>Заказать</Link> /
                <Link to={`${routes.order}${routes.details}`}>Предмет</Link> / */}
                <span>Сорочка</span>
            </nav>
        </div>);
    }
}

export {
    HeaderContent,
};