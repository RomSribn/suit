import * as React from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { SaveButton } from './SaveButton';
import { routes } from '../routes';
import { Button } from '../../../components/Button';
import { MutuallyExclusivePopup } from '../../../components/MutuallyExclusivePopup';
import { PopUp } from '../../../containers/Popup';
import { FadeIn } from '../../../containers/Transitions';
import { loc } from './loc';
import { updateOrder } from './utils';

import './styles.styl';
import { FooterBarProps } from './typings';

type Props = FooterBarProps & { orderStore: IOrderStore };

const checkItemForExceptions  = (
    allItems: {items: {exception: string[]}[]}[],
    comparedValue: {items: {exception: string[]}[]},
    activeChoices: string[],
): boolean | undefined => {
    if (!comparedValue) { return undefined; }

    const nextExceptions: string[][] =
        comparedValue.items
            .map(item => item.exception);

    let hasExceptionsBefore = false;

    activeChoices.forEach(currentChoice => {
        if (!hasExceptionsBefore &&
            nextExceptions.every(ex => ex.includes(currentChoice))) {
            hasExceptionsBefore = true;
        }
    });

    return hasExceptionsBefore;
};

class FooterBar extends React.Component<Props> {
    static defaultProps = {
        goBack: () => undefined,
        popOrderPathitem: () => undefined,
        lang: 'en',
        backLink: '',
    };

    onBackClick = () => {
        const props = this.props;
        const { setActiveItem } = props.orderStore;
        setActiveItem(null);
        props.popOrderPathitem!();
    }
    saveCallback = (linkToRedirect: string | undefined) => {
        const {
            popOrderPathitem,
            routing
        } = this.props;
        routing.push(linkToRedirect);
        popOrderPathitem!();
    }

    render() {
        const {
            lang,
            backLink = '',
            mutuallyExclusivePopup
        } = this.props;
        return (
            <div className="footer-btn-bar footer-btn-bar__mobile">
                <PopUp open={mutuallyExclusivePopup && mutuallyExclusivePopup!.show}>
                  {
                    mutuallyExclusivePopup && mutuallyExclusivePopup!.show ?
                    <MutuallyExclusivePopup lang={lang!} {...mutuallyExclusivePopup!} /> :
                    null
                  }
                </PopUp>

                <Switch>
                    <Route
                        path={routes.subgroupChoice}
                        component={(...args: any[]) => { // tslint:disable-line
                            return (
                                <Link
                                    to={backLink}
                                >
                                    <Button
                                        theme="white"
                                        className="back-button"
                                        onClick={() => {
                                            updateOrder({
                                                match: args[0].match,
                                                Subgroups: this.props.Subgroups,
                                                orderStore: this.props.orderStore,
                                            });
                                            this.onBackClick();
                                        }}
                                    >
                                        {loc[lang!].back}
                                    </Button>
                                </Link>
                            );
                        }}
                    />
                    <Route path={routes.garment}>
                        <Link to={backLink}>
                            <Button
                                theme="white"
                                className="back-button"
                            >
                                {loc[lang!].back}
                            </Button>
                        </Link>
                    </Route>
                    <Route
                        path={routes.details}
                        component={() => {
                            return (
                                <a href={process.env.BASE_SERVICE_LINK || '#'}>
                                    <Button
                                        theme="white"
                                        className="back-button"
                                    >
                                        {loc[lang!].back}
                                    </Button>
                                </a>
                            );
                        }}
                    />
                </Switch>

                <Switch>
                    <Route
                        path={routes.subgroupChoice}
                        component={(...props: any[]) => { // tslint:disable-line
                            const group: string = props[0].match.params.group;
                            const subGroup: string = props[0].match.params.subgroup;
                            const garment: string = props[0].match.params.garment;

                            const currentData = JSON.parse(JSON.stringify(this.props.subgroupsStore!.data));

                            let link = `${routes.details}/${garment}`;

                            if (group === 'fabric_ref') {
                                link = `${link}/design/${currentData.design[0].subsection_our_code}`;
                            }

                            if (group === 'design') {
                                let currentIndex =
                                    (currentData.design as Subgroup[])
                                        .findIndex(item => item.subsection_our_code === subGroup);

                                const currentOrderChoices =
                                    Object.values(this.props.orderStore.order[garment][0].design)
                                        .filter(Boolean).map((s: {our_code: string}) => s.our_code);

                                let nextItem = undefined;

                                for (let i = (currentIndex + 1); i <= currentData.design.length; i++) {
                                    if (nextItem !== undefined) {
                                        break;
                                    }

                                    const hasExceptionsBefore =
                                        checkItemForExceptions(
                                            currentData.design,
                                            currentData.design[i],
                                            currentOrderChoices);
                                    if (hasExceptionsBefore === false) {
                                        nextItem = currentData.design[i];
                                    }
                                }

                                if (nextItem) {
                                    link =
                                        `${link}/design/` +
                                        `${nextItem.subsection_our_code}`;
                                    } else {
                                        link = `${link}/fitting/fitting`;
                                    }
                            }

                            if (group === 'fitting') {
                                link = `/order/details/${garment}`;
                            }

                            return (
                                <Link
                                    to={`${routes.details}/${props[0].match.params.garment}`}
                                    onClick={this.onBackClick}
                                >
                                    <SaveButton
                                        {...props[0]}
                                        saveCallback={
                                            () => {
                                                this.saveCallback(
                                                    `${routes.details}/${props[0].match.params.garment}`
                                                );
                                            }
                                        }
                                        isUpdate={true}
                                        lang={lang}
                                        link={link}
                                    >
                                        {loc[lang!].save}
                                    </SaveButton>
                                </Link>
                            );
                        }}
                    />
                    <Route path={routes.garment}>
                        <SaveButton>{loc[lang!].create}</SaveButton>
                    </Route>

                    <Route path={routes.details}>
                    {   this.props.orderId ?
                        <SaveButton
                            saveExistingOrder={true}
                        >
                            {loc[lang!].update}
                        </SaveButton> :
                        <FadeIn>
                            <SaveButton>{loc[lang!].create}</SaveButton>
                        </FadeIn>
                    }
                    </Route>
                </Switch>
            </div>
        );
    }
}

export {
    FooterBar,
};
