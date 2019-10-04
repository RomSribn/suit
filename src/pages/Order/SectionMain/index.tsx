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

class MainSection extends React.Component<MainSectionProps> {
    render() {
        const {
            isIndexPage,
            detailsDeep,
            afterGarmentChoice,
            routes : mainSectinoRoutes
        } = this.props;

        return (
        <React.Fragment key="order main content">
                <div
                    className="main__middle"
                    style={{
                        justifyContent: !detailsDeep
                            ? 'flex-start'
                            : 'center'
                    }}
                >
                    <Filter />
                    <GarmentChoise
                        routes={mainSectinoRoutes}
                        catalogFormClassName={classnames({ 'zero-max-height': afterGarmentChoice })}
                    />
                    <div
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
                                    <Redirect to={routes.fabric.replace(':garment', props.match.params.garment)}/>
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
