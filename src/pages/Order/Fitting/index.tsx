import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Fitting as Component } from './component';
import { inject, observer } from 'mobx-react';
import { TRANSITION_DUARAION } from '../../../config/constants';

@inject(
  (
    { app, order, garments: { GalleryStore } },
    nextProps: FittingContainerProps,
  ) => {
    const { garment, group, subgroup } = nextProps.match.params;
    return {
      garmentInfo: {
        garment,
        group,
        subgroup,
      },
      lang: app.lang,
      orderStore: order,
      galleryStore: new GalleryStore(garment, subgroup, group),
      ...nextProps,
    };
  },
)
@observer
class Fitting extends React.Component<FittingContainerProps> {
  render() {
    const { galleryStore, lang, orderStore, garmentInfo } = this.props;
    return (
      <ReactCSSTransitionGroup
        transitionName="fade-in"
        transitionEnterTimeout={TRANSITION_DUARAION}
        transitionLeaveTimeout={TRANSITION_DUARAION}
      >
        <Component
          garmentInfo={garmentInfo}
          orderStore={orderStore}
          key={galleryStore.items.toString()}
          lang={lang}
          items={[...galleryStore.items]}
        />
      </ReactCSSTransitionGroup>
    );
  }
}

export { Fitting };
