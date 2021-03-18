import * as React from 'react';
import { Demo } from '../OrderDecorationBlocks';
import { Filter } from '../Filter';
import { Footer } from '../Footer';
import { Gallery } from '../Gallery';
import { GarmentChoise } from '../GarmentChoiseForm';
import { getCombinedPathAndTitle } from '../routes';
import { Main as Details } from '../Details';
import { observer, inject } from 'mobx-react';
import { Redirect, Route, Switch } from 'react-router';
import { routes } from '../routes';
import { routes as defaultRoutes } from '../../../config/routes';
import { SubgroupChoice } from '../SubgroupChoice';
import * as classnames from 'classnames';
import CrumbRoute from '../../../utils/CrumbRoute';
import { GarmentViewController } from '../GarmentViewController';
import { loc } from '../../../components/MobileNavigationMenuPopup/loc';

@inject(
  ({
    app: {
      setDummyY,
      dummyY,
      isMenuUncovered,
      setIsMenuUncovered,
      isMenuUncoveredInitial,
      setIsMenuUncoveredInitial,
      lang,
    },
    garments: {
      garments: { currentActiveGarment },
    },
  }) => ({
    setDummyY,
    dummyY,
    isMenuUncovered,
    setIsMenuUncovered,
    isMenuUncoveredInitial,
    setIsMenuUncoveredInitial,
    currentActiveGarment,
    lang,
  }),
)
@observer
class MainSection extends React.Component<MainSectionProps> {
  state = {
    inititalTouch: 0,
  };

  componentWillUpdate(nextProps: MainSectionProps) {
    const {
      setIsMenuUncovered,
      dummyWasRendered,
      isMenuUncoveredInitial,
      route,
    } = nextProps;
    const isTriggerMenuCoverInitial: boolean =
      dummyWasRendered &&
      !isMenuUncoveredInitial &&
      !!route &&
      route.includes('order/details');
    const isInitialOrderDetailsPage: boolean =
      !!this.props.route && this.props.route.includes('order/details');
    if (
      isTriggerMenuCoverInitial &&
      setIsMenuUncovered &&
      !isInitialOrderDetailsPage
    ) {
      setIsMenuUncovered(false);
    }
  }

  componentDidUpdate(prevProps: MainSectionProps) {
    const {
      setIsMenuUncovered,
      dummyWasRendered,
      isMenuUncoveredInitial,
      setIsMenuUncoveredInitial,
      route,
    } = this.props;

    const isTriggerMenuCoverDown: boolean =
      prevProps.dummyY !== this.props.dummyY && this.props.dummyY! > 0;

    const isTriggerMenuCoverInitial: boolean =
      dummyWasRendered &&
      !isMenuUncoveredInitial &&
      !!route &&
      route.includes('order/details');

    if (isTriggerMenuCoverDown && !!this.props.setIsMenuUncovered) {
      this.props.setIsMenuUncovered(false);
    }
    /**
     * Trigger scrolling up menu block (default: at the bottom);
     * Component has been mounted a little bit early then Spinner is get out, then a little delay.
     */
    if (isTriggerMenuCoverInitial) {
      setTimeout(() => {
        if (setIsMenuUncovered && setIsMenuUncoveredInitial) {
          setIsMenuUncovered(true);
          setIsMenuUncoveredInitial(true);
        }
      }, 400);
      return;
    }
  }
  render() {
    const {
      isIndexPage,
      detailsDeep,
      isMenuUncovered,
      isMenuUncoveredInitial,
      setIsMenuUncovered,
      currentActiveGarment,
      lang = 'ru',
    } = this.props;

    const { inititalTouch } = this.state;

    // isIndexPage из пропсов работает неправильно.
    const isRealIndexPage = window.location.pathname === defaultRoutes.mainPage;

    return (
      <React.Fragment key="order main content">
        <div
          className="main__middle"
          style={
            !isRealIndexPage
              ? {
                  transform: isMobile()
                    ? `translateY(${isMenuUncovered ? 10 : 70}%)`
                    : 'unset',
                  transitionDuration:
                    !isMenuUncoveredInitial && !isMenuUncovered ? '0' : '0.5s',
                  transitionProperty: 'transform',
                  transitionTimingFunction: 'ease',
                  transitionDelay: '0s',
                  justifyContent: 'space-between',
                }
              : {
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: '100px',
                  justifyContent: 'space-around',
                }
          }
        >
          {!isMenuUncovered && isMobile() && (
            <div className="above-content">
              <div className="above-content__garment">
                <span>{loc[lang][currentActiveGarment]}</span>
              </div>
              <GarmentViewController />
            </div>
          )}
          <Filter />
          {isRealIndexPage && <Demo />}
          {isRealIndexPage && <GarmentChoise isNavigationGarments={false} />}
          <div
            style={isRealIndexPage ? { display: 'none' } : {}}
            className={classnames(
              {
                customs: !isIndexPage,
              },
              {
                /**
                 * Если убрать этот класс, можно увидеть как дохера
                 * ререндеров происходит при переходе на галлерею тканей
                 * @todo Разобраться че за нах
                 */
                'customs--short': !detailsDeep,
              },
            )}
            onTouchStart={(event: React.TouchEvent<HTMLInputElement>) => {
              this.setState({
                inititalTouch: event.touches[0].clientY,
              });
            }}
            onTouchEnd={(event: React.TouchEvent<HTMLInputElement>) => {
              if (event.changedTouches[0].clientY - inititalTouch < -10) {
                setIsMenuUncovered!(
                  !!(event.changedTouches[0].clientY < inititalTouch),
                );
              }
            }}
          >
            <Switch>
              <Route
                exact={true}
                path={routes.garment}
                component={(props: TRouteProps) => (
                  <Redirect
                    to={routes.fabric.replace(
                      ':garment',
                      props.match.params.garment,
                    )}
                  />
                )}
              />
              <CrumbRoute
                {...getCombinedPathAndTitle('garment')}
                component={SubgroupChoice}
              />
              <Route path={routes.details} component={Details} />
            </Switch>
          </div>
          <Switch>
            <CrumbRoute
              {...getCombinedPathAndTitle('subgroupChoice')}
              component={Gallery}
            />
          </Switch>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export { MainSection };
