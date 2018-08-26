import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Main as Component } from './component';

@inject(({ app, garments: { garments }, order }, nextProps) => ({
    lang: app.lang,
    garments: garments.garmentsList,
    activeGarmentsStore: garments.activeGarments,
    setActiveGarment: garments.setActiveGarment,
    order: order.order,
    ...nextProps,
}))
@observer
class Main extends React.Component<DetailsContainerProps> {
    render() {
        const {
            activeGarmentsStore,
            lang,
            garments,
        } = this.props;
        const activeGarments = activeGarmentsStore
            .map((g: string) => ({
                id: g,
                link: g,
                linkName: garments[g].titles
                            ? garments[g].titles![lang!]
                                ? garments[g].titles![lang!]
                                : garments[g].name
                            : garments[g].name,
            }));
        return (
            <Component
                lang={lang}
                activeGarments={[...activeGarments]}
            />);
    }
}

export {
    Main,
};