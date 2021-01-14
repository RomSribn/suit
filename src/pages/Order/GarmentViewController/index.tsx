import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { VisibleButton } from '../../../components/VisibleButton';

@inject(({ garments: { garments }, order: { setVisibleGarments, visibleGarments } }) => {
    return {
        activeGarments: [...garments.activeGarments],
        currentActiveGarment: garments.currentActiveGarment,
        setCurrentActiveGarment: garments.setCurrentActiveGarment,
        setVisibleGarments,
        visibleGarments,
    };
})
@observer
class GarmentViewController extends React.Component<IGarmentChoiceFormProps> {
    render() {
        const {
            setVisibleGarments,
            activeGarments,
            visibleGarments,
            currentActiveGarment
        } = this.props;
        return (
            <div
                onClick={() => {
                    setVisibleGarments!(activeGarments!);
                }}
            >
                <VisibleButton isHide={!!visibleGarments![currentActiveGarment!]} />
            </div>
        );
    }
}

export { GarmentViewController };