import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import * as classnames from 'classnames';
import { getCombinedPathAndTitle } from '../routes';
import CrumbRoute from '../../../utils/CrumbRoute';
import { Filter } from '../Filter';
import { GarmentChoise } from '../GarmentChoiseForm';
import { Main as Details } from '../Details';
import { Gallery } from '../Gallery';
import { SubgroupChoice } from '../SubgroupChoice';
import { Footer } from '../Footer';
import { routes } from '../routes';
import { routes as defaultRoutes } from '../../../config/routes';

import './styles.styl';
import { Demo } from '../OrderDecorationBlocks';

class MainSection extends React.Component<MainSectionProps> {
    state = {
        inititalTouch: 0,
        isMenuUncovered: true
    };
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
                        transform: isMobile() ? `translateY(${this.state.isMenuUncovered ? 10 : 70}%)` : 'unset',
                        transition: '0.5s',
                        justifyContent: !detailsDeep
                            ? 'flex-start'
                            : 'center',
                    } : {
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: '100px',
                            justifyContent: 'space-around',
                        }}
                >
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
                                ['customs--short']: !detailsDeep,
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
                            if ( (event.changedTouches[0].clientY -
                                this.state.inititalTouch) < -10 || (event.changedTouches[0].clientY -
                                this.state.inititalTouch) > 10) {
                            this.setState({ isMenuUncovered: event.changedTouches[0].clientY
                                < this.state.inititalTouch});
                                }
                            console.log(this.state.isMenuUncovered ); // tslint:disable-line
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
