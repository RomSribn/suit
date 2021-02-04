import * as React from 'react';
import { filterFields } from '../SubgroupChoice';
import { Fitting } from '../Fitting/component';
import { Gallery as Component } from './component';
import { InitialsCustomInput } from '../Initials-custom-input';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { routes } from '../routes';
import ToggleBar from '../ToggleBar';

const galleryCache = {};

@inject(
  (
    { app, garments: { GalleryStore, Subgroups }, order, filterStore },
    nextProps: GalleryContainerProps,
  ) => {
    const { garment, group, subgroup } = nextProps.match.params;
    const {
      setActiveItem,
      setPreviewElement,
      activeElement,
      exceptions,
    } = order;

    const cacheName = [garment, group, subgroup].toString();
    if (!galleryCache[cacheName]) {
      galleryCache[cacheName] = new GalleryStore(
        garment,
        group,
        subgroup,
        exceptions,
      );
    }

    return {
      app,
      setActiveOrderItem: setActiveItem,
      setPreviewElement,
      lang: app.lang,
      activeOrderItem: activeElement,
      orderStore: order,
      activeGarment: order.activeGarment,
      galleryStore: galleryCache[cacheName],
      filterStore: filterStore,
      Subgroups: Subgroups,
      SubgroupsStore: new Subgroups(garment),
      defaultValues: order.defaultValues
        ? order.defaultValues![nextProps.match.params.garment][0]
        : {},
      ...nextProps,
    };
  },
)
@observer
class GalleryBlock extends React.Component<GalleryContainerProps> {
  render() {
    const orderStore = this.props.orderStore!;
    if (orderStore.isEmptyOrder()) {
      return <Redirect to={routes.details} />;
    }
    const {
      galleryStore,
      lang,
      setActiveOrderItem,
      setPreviewElement,
      match: {
        params: { group, subgroup, garment },
        url,
      },
      filterStore,
      match,
      SubgroupsStore,
      defaultValues,
    } = this.props;

    const $store = SubgroupsStore.data as SubgroupsI;

    const data = $store
      ? [
          ...$store.design.map((v: Subgroup) =>
            filterFields(
              v,
              'design',
              lang!,
              orderStore!,
              garment,
              defaultValues,
            ),
          ),
        ]
      : [];

    const dataFitting = $store
      ? [
          ...$store.fitting.map((v: Subgroup) =>
            filterFields(
              v,
              'fitting',
              lang!,
              orderStore!,
              'shirt',
              defaultValues,
            ),
          ),
        ]
      : [];

    if (group === 'design' && subgroup === 'initials_text') {
      return (
        <div style={{ padding: '1.333rem 0 0 0', width: '100%' }}>
          <InitialsCustomInput />
        </div>
      );
    }
    const items = [...galleryStore.items];
    const isFabric = subgroup === 'fabric';

    return group === 'fitting' ? (
      <Fitting
        key={galleryStore.items.toString()}
        lang={lang}
        items={items}
        orderStore={orderStore}
        dataFitting={dataFitting}
        garment={garment}
        group={group}
        url={url}
      />
    ) : (
      <>
        {group === 'design' && (
          <div
            className={'nav-overflow'}
            style={{
              position: 'absolute',
              paddingTop: 50,
              zIndex: -1,
            }}
          >
            <div className={'design-navigation-wrapper'}>
              <Link
                to={`/order/details/${garment}/${group}`}
                className={'design-navigation'}
              >
                Все
              </Link>
              {data.map((item) => {
                const isActive = url.includes(item.id);
                return (
                  <div
                    key={item.id}
                    ref={(element) =>
                      element &&
                      isActive &&
                      element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'end',
                        inline: 'nearest',
                      })
                    }
                  >
                    <Link
                      to={`/order/details/${garment}/${item.link}`}
                      className={`design-navigation ${
                        isActive ? '_active' : ''
                      }`}
                      key={item.id}
                    >
                      {item.linkName}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div
          style={{
            display: isFabric ? 'contents' : 'block',
            marginTop: isFabric ? 0 : 45,
            visibility:
              this.props.app && this.props.app.searchedItemsCount
                ? 'visible'
                : 'hidden',
          }}
        >
          <Component
            key={(items || []).reduce(
              (acc: string, item: GalleryStoreItem) => (acc += item.our_code),
              'key',
            )}
            lang={lang}
            match={match}
            setActiveOrderItem={setActiveOrderItem}
            setPreviewElement={setPreviewElement}
            items={items}
            galleryStore={galleryStore}
            group={group}
            filterStore={filterStore}
            orderStore={orderStore}
            activeGarment={this.props.activeGarment}
            activeElement={orderStore.activeElement}
            previewElement={orderStore.previewElement}
            activeOrderItem={this.props.activeOrderItem}
            app={this.props.app}
          />
        </div>
      </>
    );
  }
}

@inject()
@observer
class Gallery extends React.Component<GalleryContainerProps> {
  render() {
    const {
      match: {
        params: { group, garment },
      },
    } = this.props;
    return (
      <>
        {group === 'fabric_ref' && <ToggleBar garment={garment} />}
        <GalleryBlock {...this.props} />
      </>
    );
  }
}

export { Gallery };
