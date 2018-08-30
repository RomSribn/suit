import * as React from 'react';
import { Route, Switch } from 'react-router';
import * as classnames from 'classnames';
import { Header } from '../Header';
import { Filter } from '../Filter';
import { GarmentChoise } from '../GarmentChoiseForm';
import { Main as Details } from '../Details';
import { Gallery } from '../Gallery';
import { SubgroupChoice } from '../SubgroupChoice';
import { Footer } from '../Footer';

class MainSection extends React.Component<MainSectionProps> {
    render() {
        const {
            routes,
            isIndexPage,
            detailsDeep,
        } = this.props;
        return (
            <div
                className={
                    classnames(
                        'main',
                        {
                            'main--white': !isIndexPage,
                        },
                    )
                }
            >
                <Header />
                <div
                    className="main__middle"
                    style={{
                        justifyContent: !detailsDeep
                            ? 'flex-start'
                            : 'center',
                    }}
                >
                    <Filter />
                    <GarmentChoise
                        catalogFormClassName={classnames({ 'zero-max-height': !detailsDeep })}
                        routes={routes}
                    />
                    <div
                        className={classnames(
                            {
                                customs: !isIndexPage,  
                            },
                            {
                                ['customs--short']: !detailsDeep,
                            },
                        )}
                    >
                        <Switch>
                            <Route
                                path={`${routes.details}/:garment`}
                                component={SubgroupChoice}
                            />                        
                            <Route path={routes.details} component={Details} />
                        </Switch>
                    </div>
                    <Switch>
                        <Route
                            path={`${routes.details}/:garment/:subgroup/:group`}
                            component={Gallery}
                        />
                    </Switch>
                </div>
                <Footer routes={routes}/>
            </div>);
    }
}

export {
    MainSection,
};
