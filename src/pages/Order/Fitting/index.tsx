import * as React from 'react';
import { inject, observer } from 'mobx-react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { TRANSITION_DUARAION } from '../../../config/constants';
import { Fitting as Component } from './component';

@inject(({app, garments: { GalleryStore }}, nextProps: FittingContainerProps) => {
    const {
        garment,
        group,
        subgroup,
    } = nextProps.match.params;
    return {
        lang: app.lang,
        galleryStore: new GalleryStore(garment, subgroup, group),
        ...nextProps,
    };
})
@observer
class Fitting extends React.Component<FittingContainerProps> {
    render() {
        const {
            galleryStore,
            lang,
        } = this.props;
        return (
            <ReactCSSTransitionGroup
                transitionName="fade-in"
                transitionEnterTimeout={TRANSITION_DUARAION}
                transitionLeaveTimeout={TRANSITION_DUARAION}
            >
            <Component
                key={galleryStore.items.toString()}
                lang={lang}
                items={[...galleryStore.items]}
            />
            </ReactCSSTransitionGroup>
        );
    }
}

export {
    Fitting,
};