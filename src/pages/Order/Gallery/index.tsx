import * as React from 'react';
import { inject, observer } from 'mobx-react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as classnames from 'classnames';
import { TRANSITION_DUARAION } from '../../../config/constants';
import { Gallery as Component } from './component';
import { Fitting } from '../Fitting/component';

@inject(({app, garments: { GalleryStore }}, nextProps: GalleryContainerProps) => {
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
class Gallery extends React.Component<GalleryContainerProps> {
    render() {
        const {
            galleryStore,
            lang,
            match: { params: { group } },
        } = this.props;
        return (
            <div className={classnames({sizes: group === 'fitting'})}>
                <ReactCSSTransitionGroup
                    transitionName="fade-in"
                    transitionEnterTimeout={TRANSITION_DUARAION}
                    transitionLeaveTimeout={TRANSITION_DUARAION}
                >
                {   group === 'fitting'
                    ? <Fitting 
                        key={galleryStore.items.toString()}
                        lang={lang}
                        items={[...galleryStore.items]}
                    />
                    : <Component
                        key={galleryStore.items.toString()}
                        lang={lang}
                        items={[...galleryStore.items]}
                    />
                }
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

export {
    Gallery,
};