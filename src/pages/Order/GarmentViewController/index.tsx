import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { VisibleButton } from '../../../components/VisibleButton';

@inject(({ garments: {
    garments
},
    order: {
        setHiddenGarments,
        hiddenGarments,
        setOrderDummyParams
    }
}) => {
    return {
        activeGarments: [...garments.activeGarments],
        currentActiveGarment: garments.currentActiveGarment,
        setCurrentActiveGarment: garments.setCurrentActiveGarment,
        setHiddenGarments,
        hiddenGarments,
        setOrderDummyParams
    };
})
@observer
class GarmentViewController extends React.Component<IGarmentChoiceFormProps> {
    render() {
        const {
            setHiddenGarments,
            activeGarments,
            hiddenGarments,
            currentActiveGarment,
            // setOrderDummyParams
        } = this.props;
        return (
            <div
                onClick={() => {
                    setHiddenGarments!(activeGarments!);
                    // setOrderDummyParams!(activeGarments!);
                }}
            >
                <VisibleButton isHide={!!hiddenGarments![currentActiveGarment!]} />
            </div>
        );
    }
}

export { GarmentViewController };