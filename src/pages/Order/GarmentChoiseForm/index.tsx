import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { GarmentChoise as GarmentChoiseComponent } from './component';

@inject(({ app, garments: { garments, Subgroups }, routing, order }) => {
    return {
        lang: app.lang,
        pushOrderPathitem: app.pushOrderPathItem,
        garments: garments.garmentsList,
        fetchGarments: garments.fetchGarmentsList,
        toggleGarment: (garment: string) => (action: string) => {
            garments.toggleGarment(action)(garment);
        },
        activeGarments: [...garments.activeGarments],
        currentActiveGarment: garments.currentActiveGarment,
        setCurrentActiveGarment: garments.setCurrentActiveGarment,
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
            garments,
            activeGarments,
            toggleGarment,
            path,
            fetchGarments,
            makeOrder,
            pushOrderPathitem,
            isNavigationGarments,
            currentActiveGarment,
            setCurrentActiveGarment,
        } = this.props;
        return (
            <GarmentChoiseComponent
                setCurrentActiveGarment={setCurrentActiveGarment}
                isNavigationGarments={isNavigationGarments}
                currentActiveGarment={currentActiveGarment}
                lang={lang}
                garments={garments}
                fetchGarments={fetchGarments}
                activeGarments={activeGarments}
                toggleGarment={toggleGarment}
                path={path}
                makeOrder={makeOrder}
                pushOrderPathitem={pushOrderPathitem}
            />
        );
    }
}

export {
    GarmentChoise,
};