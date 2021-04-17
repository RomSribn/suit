import * as React from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { SaveButton } from './SaveButton';
import { routes } from '../routes';
import { Button } from '../../../components/Button';
import { MutuallyExclusivePopup } from '../../../components/MutuallyExclusivePopup';
import { PopUp } from '../../../containers/Popup';
import { FadeIn } from '../../../containers/Transitions';
import { loc } from './loc';
import { updateOrder } from './utils';
import { routes as configRoutes } from '../../../config/routes';
import * as classnames from 'classnames';

import './styles.styl';
import { FooterBarProps } from './typings';
import { OrderInfoMobile } from '../OrderInfo/component';
import * as moment from 'moment';
import { inject, observer } from 'mobx-react';

type Props = FooterBarProps & {
  orderStore: IOrderStore;
  isBackButtonDisabled?: TIsBackButtonDisabled;
};

@inject(({ order, app: { isBackButtonDisabled } }) => ({
  order,
  isBackButtonDisabled,
}))
@observer
class FooterBar extends React.Component<COrderInfoProps & Props> {
  static defaultProps = {
    goBack: () => undefined,
    popOrderPathitem: () => undefined,
    lang: 'en',
    backLink: '',
  };

  onBackClick = () => {
    const props = this.props;
    const { setActiveItem } = props.orderStore;
    setActiveItem(null);
    props.popOrderPathitem!();
  };
  saveCallback = (linkToRedirect: string | undefined) => {
    const { popOrderPathitem, routing } = this.props;
    routing.push(linkToRedirect);
    popOrderPathitem!();
  };

  render() {
    const {
      lang,
      mutuallyExclusivePopup,
      order,
      isBackButtonDisabled,
    } = this.props;
    const orderInfo = order!.orderInfo;
    const deliveryDate = orderInfo
      ? moment().add(orderInfo.deliveryDays, 'days').format('DD.MM.YYYY')
      : '00.00.0000';
    const price = orderInfo ? orderInfo.price[lang!] : '0';
    return (
      <div className="footer-btn-bar footer-btn-bar__mobile">
        <PopUp open={mutuallyExclusivePopup && mutuallyExclusivePopup!.show}>
          {mutuallyExclusivePopup && mutuallyExclusivePopup!.show ? (
            <MutuallyExclusivePopup lang={lang!} {...mutuallyExclusivePopup!} />
          ) : null}
        </PopUp>

        <Switch>
          <Route
            path={routes.fabric}
            component={() => (
              <Link
                to={'/order'}
                className={classnames({ isBackButtonDisabled })}
              >
                <Button
                  theme="white"
                  className="back-button"
                  disabled={isBackButtonDisabled}
                >
                  {loc[lang!].back}
                </Button>
              </Link>
            )}
          />
          <Route
            path={routes.fitting}
            component={(
              props: any, // tslint:disable-line
            ) => (
              <Link
                to={routes.design.replace(
                  ':garment',
                  props.match.params.garment,
                )}
              >
                <Button
                  theme="white"
                  className="back-button"
                  onClick={() => {
                    updateOrder({
                      match: props.match,
                      Subgroups: this.props.Subgroups,
                      orderStore: this.props.orderStore,
                    });
                  }}
                >
                  {loc[lang!].back}
                </Button>
              </Link>
            )}
          />
          <Route
            path={routes.subgroupChoice}
            // tslint:disable-next-line
            component={(props: any) => {
              return (
                <Link
                  to={routes.design.replace(
                    ':garment',
                    props.match.params.garment,
                  )}
                >
                  <Button
                    theme="white"
                    className="back-button"
                    onClick={() => {
                      updateOrder({
                        match: props.match,
                        Subgroups: this.props.Subgroups,
                        orderStore: this.props.orderStore,
                      });
                    }}
                  >
                    {loc[lang!].back}
                  </Button>
                </Link>
              );
            }}
          />
          <Route
            path={routes.design}
            component={(
              props: any, // tslint:disable-line
            ) => (
              <Link
                to={routes.fabric.replace(
                  ':garment',
                  props.match.params.garment,
                )}
              >
                <Button theme="white" className="back-button">
                  {loc[lang!].back}
                </Button>
              </Link>
            )}
          />
        </Switch>
        {isMobile() && (
          <OrderInfoMobile
            lang={lang!}
            deliveryDate={deliveryDate}
            price={price}
          />
        )}
        <Switch>
          <Route
            path={routes.fabric}
            component={
              // tslint:disable-next-line no-any
              (props: any) => (
                <Link
                  to={`${routes.design.replace(
                    ':garment',
                    props.match.params.garment,
                  )}`}
                >
                  <SaveButton
                    {...props[0]}
                    saveCallback={() => {
                      this.saveCallback(
                        `${routes.details}/${props.match.params.garment}`,
                      );
                    }}
                    isUpdate={true}
                    lang={lang}
                  >
                    {loc[lang!].save}
                  </SaveButton>
                </Link>
              )
            }
          />

          <Route
            path={routes.fitting}
            render={() =>
              this.props.orderId ? (
                <Link to={configRoutes.orderList}>
                  <SaveButton saveExistingOrder={true}>
                    {loc[lang!].update}
                  </SaveButton>
                </Link>
              ) : (
                <FadeIn>
                  <SaveButton>{loc[lang!].create}</SaveButton>
                </FadeIn>
              )
            }
          />

          <Route
            path={routes.subgroupChoice}
            component={
              // tslint:disable-next-line no-any
              (props: any) => {
                return (
                  <Link
                    to={`${routes.design.replace(
                      ':garment',
                      props.match.params.garment,
                    )}`}
                  >
                    <SaveButton
                      {...props[0]}
                      saveCallback={() => {
                        this.saveCallback(
                          `${routes.fitting}/${props.match.params.garment}`,
                        );
                      }}
                      isUpdate={true}
                      lang={lang}
                    >
                      {loc[lang!].save}
                    </SaveButton>
                  </Link>
                );
              }
            }
          />

          <Route
            path={routes.design}
            render={
              // tslint:disable-next-line no-any
              (props: any) => {
                const isAuth = this.props.isAuth;
                if (!isAuth) {
                  return <SaveButton>{loc[lang!].save}</SaveButton>;
                }
                return (
                  <Link
                    to={`${routes.fitting.replace(
                      ':garment',
                      props.match.params.garment,
                    )}`}
                  >
                    <SaveButton
                      {...props[0]}
                      saveCallback={() => {
                        this.saveCallback(
                          `${routes.fitting}/${props.match.params.garment}`,
                        );
                      }}
                      isUpdate={true}
                      lang={lang}
                    >
                      {loc[lang!].save}
                    </SaveButton>
                  </Link>
                );
              }
            }
          />

          <Route path={routes.garment}>
            <SaveButton>{loc[lang!].create}</SaveButton>
          </Route>

          <Route path={routes.details}>
            {this.props.orderId ? (
              <SaveButton saveExistingOrder={true}>
                {loc[lang!].update}
              </SaveButton>
            ) : (
              <FadeIn>
                <SaveButton>{loc[lang!].create}</SaveButton>
              </FadeIn>
            )}
          </Route>
        </Switch>
      </div>
    );
  }
}

export { FooterBar };
