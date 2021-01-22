import * as React from 'react';
import './styles.styl';
import { inject, observer } from 'mobx-react';
import { loc } from './loc';
import { ToggleBarProps } from './typings';

export const basisPart = 'basis';

@inject(
    ({
        order,
        app,
        garments: {
            Subgroups,
            garments: { activeGarments, currentActiveGarment },
        },
        filterStore: {
            clearSelectedItems
        }
    }) => {
        return {
            orderStore: order,
            lang: app.lang,
            subgroupsStore: new Subgroups(currentActiveGarment),
            activeGarments,
            clearSelectedItems
        };
    }
)
@observer
class ToggleBar extends React.Component<ToggleBarProps> {
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.orderStore!.setPartOfShirtToggle(e.target.value);
    }

    handleReset = () => {
        const {
            orderStore,
            garment,
            activeGarments,
            clearSelectedItems
        } = this.props;
        const {
            hiddenGarments
        } = orderStore!;
        const parsedActiveGarments =
            activeGarments!.filter(el => !Object.values(hiddenGarments!).includes(el));
        clearSelectedItems!();
        orderStore!.clearAdditionalFabric(garment);
        orderStore!.setOrderDummyParams(parsedActiveGarments!);
    }

    render() {
        const { orderStore, lang = 'ru', subgroupsStore } = this.props;

        let itemsWithOwnFabric: Subgroup[] = [];
        if (subgroupsStore!.data) {
            itemsWithOwnFabric = subgroupsStore!.data.design.filter(
                (s) => s.is_allowOwnFabric
            );
        }

        const partOfShirtToggleItems = [
            {
                subsection_our_code: basisPart,
                title: { [lang]: loc[lang].basis },
            },
            ...itemsWithOwnFabric,
        ];

        return (
            <div className="toggle-bar">
                <div className="toggles">
                    {partOfShirtToggleItems.map((item) => (
                        <span key={item.subsection_our_code} className="toggle">
                            <input
                                className="toggle__input"
                                type="radio"
                                name="allowed_own_fabric"
                                id={item.subsection_our_code}
                                value={item.subsection_our_code}
                                checked={
                                    orderStore!.partOfShirtToggle === item.subsection_our_code
                                }
                                onChange={this.handleChange}
                            />
                            <label
                                className="toggle__label"
                                htmlFor={item.subsection_our_code}
                            >
                                {loc[lang].for} {item.title[lang]}
                            </label>
                        </span>
                    ))}
                </div>
                <button className="toggles-block__btn" onClick={this.handleReset}>
                    {loc[lang].reset}
                </button>
            </div>
        );
    }
}

export default ToggleBar;
