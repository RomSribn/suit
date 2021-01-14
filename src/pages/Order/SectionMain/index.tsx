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

@inject(({ app: { setDummyY, dummyY, isMenuUncovered, setIsMenuUncovered } }) => ({
    setDummyY,
    dummyY,
    isMenuUncovered,
    setIsMenuUncovered
}))
@observer
class MainSection extends React.Component<MainSectionProps> {
    state = {
        inititalTouch: 0
    };

    componentDidUpdate(prevProps: MainSectionProps) {
        if ((prevProps.dummyY !== this.props.dummyY) && (this.props.dummyY! > 0) && this.props.setIsMenuUncovered) {
            this.props.setIsMenuUncovered(false);
        }
    }
    render() {
        const {
            isIndexPage,
            detailsDeep,
        } = this.props;

        const isRealIndexPage =
            window.location.pathname ===
            defaultRoutes.mainPage; // isIndexPage из пропсов работает неправильно.

        return (
            <React.Fragment key="order main content">
                <div
                    className="main__middle"
                    style={!isRealIndexPage ? {
                        transform: isMobile() ? `translateY(${this.props.isMenuUncovered ? 10 : 70}%)` : 'unset',
                        transition: '0.5s',
                        justifyContent: 'space-between',
                    } : {
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: '100px',
                            justifyContent: 'space-around',
                        }}
                >
                    <div
                        style={{
                            display: isMobile() ? 'block' : 'none',
                            position: 'absolute',
                            top: -33,
                            right: 'calc(0% + 10px)',
                            transform: 'scale(0.9)',
                            opacity: 0.8
                        }}
                    >
                        <GarmentViewController />
                    </div>
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
                        onTouchStart={
                            (event: React.TouchEvent<HTMLInputElement>) => {
                                this.setState({
                                    inititalTouch: event.touches[0].clientY,
                                });
                            }
                        }
                        onTouchEnd={
                            (event: React.TouchEvent<HTMLInputElement>) => {
                                if ((event.changedTouches[0].clientY -
                                    this.state.inititalTouch) < -10) {
                                    this.props.setIsMenuUncovered!(!!(event.changedTouches[0].clientY
                                        < this.state.inititalTouch));
                                }
                            }
                        }
                    >
                        <Switch>
                            <Route
                                exact={true}
                                path={routes.garment}
                                // @ts-ignore
                                component={(props) => ( // tslint:disable-line
                                    <Redirect
                                        to={routes.fabric.replace(':garment', props.match.params.garment)}
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

export {
    MainSection,
};
