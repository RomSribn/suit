import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router';
import { MainSection } from './SectionMain';
import { routes } from './routes';
import { Spinner } from '../../components/Spinner';

let wasRendered = false;

class Order extends React.PureComponent<any> {  //tslint:disable-line
    state = { showSpinner: true };
    componentWillMount() {
        wasRendered = false;
    }
    hideSpinner = () => this.setState({ showSpinner: false });
    render() {
        if (!wasRendered) {
            wasRendered = true;
            // TODO: изменить редирект. Сейчас на /shirt потому что есть только рубашка
            return <Redirect to={routes.index + '/shirt'} />;
        }
        const {
            location,
         } = this.props;
        const detailsDeep = !(/\/order\/details\/.*\/.*/i.test(location.pathname));
        const afterGarmentChoice = (/\/order\/.*\/.*/i.test(location.pathname));
        const isIndexPage = false;

        return (
            <React.Fragment key="widget with spinner">
                {this.state.showSpinner && <Spinner />}
                <div className="content" key={isIndexPage.toString()}>
                    <MainSection
                        afterGarmentChoice={afterGarmentChoice}
                        isIndexPage={isIndexPage}
                        detailsDeep={detailsDeep}
                    />
                    <DemoSection onDummyLoad={this.hideSpinner}/>
                </div>
          </React.Fragment>
        );
    }
}

@inject(({ order, garments }) => ({
    orderStore: order,
    garmentsStore: garments.garments
}))
@observer
class Container extends React.Component<any>{ //tslint:disable-line
    render() {
        const orderStore = this.props.orderStore as IOrderStore;
        const garmentsStore = this.props.garmentsStore;
        if (!Object.keys(garmentsStore.garmentsList).length) {
            garmentsStore.fetchGarmentsList();
            return null;
        }
        if (orderStore.isEmptyOrder()) {
            orderStore.fetchInitialOrder(
                Object.keys(garmentsStore.garmentsList),
                (garments) => garmentsStore.setChosenGarments(garments)
            );   
            return null;
        }
        return <Order {...this.props} />;
    }
}

export {
    Container as Order,
};