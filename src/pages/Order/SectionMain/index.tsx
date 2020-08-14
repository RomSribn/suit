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

import './styles.styl';
import { Demo } from '../OrderDecorationBlocks';

class MainSection extends React.Component<MainSectionProps> {
    render() {
        const {
            isIndexPage,
            detailsDeep,
            afterGarmentChoice,
            routes: mainSectinoRoutes
        } = this.props;

        const isRealIndexPage = window.location.pathname === '/order'; // isIndexPage из пропсов работает неправильно.
        // Напишите уже бл регламент по роутам

        return (
            <React.Fragment key="order main content">
                <div
                    className="main__middle"
                    style={!isRealIndexPage ? {
                        justifyContent: !detailsDeep
                            ? 'flex-start'
                            : 'center',

                    } : {
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: '100px',
                            // marginLeft: '100px',
                            justifyContent: 'space-around'
                        }}
                >
                    <Filter />
                    {isRealIndexPage && <Demo />}
                    <GarmentChoise
                        routes={mainSectinoRoutes}
                        catalogFormClassName={classnames({ 'zero-max-height': afterGarmentChoice })}
                    />
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
                    >
                        <Switch>
                            <Route
                                exact={true}
                                path={routes.garment}
                                // @ts-ignore
                                component={(props) => ( // tslint:disable-line
                                    <Redirect to={routes.fabric.replace(':garment', props.match.params.garment)} />
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
