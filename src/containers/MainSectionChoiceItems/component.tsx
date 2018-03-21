import * as React from 'react';
import { Link } from 'react-router-dom';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { TRANSITION_DUARAION } from '../../config/constants';

class ChoiceItems extends React.PureComponent<ChoiceItemsProps> {
    static defaultProps = {
        items: [],
        basicRoute: '/',
        pushOrderPathitem: () => undefined,
    };
    onClick = (item: OrderPathItem) => () => {
        const { pushOrderPathItem } = this.props;
        pushOrderPathItem!(item);
    }

    render() {
        const {
            items,
            basicRoute,
        } = this.props;
        return (
        <ReactCSSTransitionGroup
            transitionName="height-fade-in"
            transitionEnterTimeout={TRANSITION_DUARAION}
            transitionLeaveTimeout={TRANSITION_DUARAION}
        >
            {items.map(
            (item: SubgroupChoiceItem) => (
                    <Link
                        to={`${basicRoute}/${item.link}`}
                        onClick={this.onClick({
                            value: item.linkName,
                            link: `${basicRoute}/${item.link}`})}
                        key={item.id}
                        style={{
                            marginBottom: '1.333rem',
                            display: 'block',
                        }}
                    >
                    <div className="custom">
                        <span
                            className="custom__name"
                            style={{
                                color: 'black',
                            }}
                        >
                            {item.linkName} {!!item.status && ':'}
                        </span>
                        <span className="custom__status">{item.status}</span>
                    </div>
                    </Link>
                )
        )}
        </ReactCSSTransitionGroup>
        );
        
    }
}

export {
    ChoiceItems,
};