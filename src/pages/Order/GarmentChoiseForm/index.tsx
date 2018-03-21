import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { GarmentChoise as GarmentChoiseComponent } from './component';

@inject(({app, garments: { garments }, routing, order}) => {
    return {
        lang: app.lang,
        pushOrderPathitem: app.pushOrderPathItem,
        garments: garments.garmentsList,
        fetchGarments: garments.fetchGarmentsList,    
        toggleGarment: (garment: string) => (action: string) => {
            garments.toggleGarment(action)(garment);
        },
        activeGarments: [...garments.activeGarments],
        path: routing.location.pathname,
        order: order.order,
        makeOrder: order.fetchInitialOrder,
    };
})
@observer
class GarmentChoise extends React.Component<GarmentChoiceFormProps> {
    render() {
        const {
            lang,
            catalogFormClassName,
            garments,
            activeGarments,
            toggleGarment,
            path,
            fetchGarments,
            routes,
            makeOrder,
            pushOrderPathitem,
        } = this.props;
        return (
            <GarmentChoiseComponent
                lang={lang}
                catalogFormClassName={catalogFormClassName}
                garments={garments}
                fetchGarments={fetchGarments}
                activeGarments={activeGarments}
                routes={routes}
                toggleGarment={toggleGarment}
                path={path}
                makeOrder={makeOrder}
                isIndexPage={path === routes.index}
                pushOrderPathitem={pushOrderPathitem}
            />
        );
    }
}

export {
    GarmentChoise,
};