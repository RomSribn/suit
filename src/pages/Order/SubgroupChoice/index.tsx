import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Switch, Route, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { SubgroupChoice as Component } from './component';
import { routes } from '../routes';
import { GroupChoice } from '../GroupChoice';
import { trim } from '../../../config/routes';
import { loc } from './loc';
import { isMobile } from '../../../utils';

let scrollData: { [key: string]: number } = {};

type FilterFields = (
    item: Subgroup,
    subgroup: string,
    lang: string,
    order: Order,
    garment: string,
    defaultValues?: OrderItem
) => SubgroupChoiceItem;
export const filterFields: FilterFields = (item, subgroup, lang, order, garment, defaultValues) => {
    let status;
    let ourCode = null;
    let defaultCode = null;
    try {
        const orderVal = order[garment][order[garment].length - 1];
        if (item.is_input) {
            status = typeof orderVal[subgroup][item.subsection_our_code] === 'object'
                ? ''
                : orderVal[subgroup][item.subsection_our_code];
        } else {
            status = orderVal[subgroup][item.subsection_our_code].title[lang];
            status = Boolean(status) ? status : loc[lang].noStatus;
        }

        if (order[garment][0].design[item.subsection_our_code]) {
            ourCode = order[garment][0].design[item.subsection_our_code].our_code;
            if (defaultValues!.design[item.subsection_our_code]) {
                defaultCode = defaultValues!.design[item.subsection_our_code]!.our_code;
            }
        } else if (order[garment][0].fabric_ref[item.subsection_our_code]) {
            ourCode = order[garment][0].fabric_ref[item.subsection_our_code].our_code;
            defaultCode = defaultValues!.fabric_ref![item.subsection_our_code].our_code;
        }
    } catch (_) {
        status = loc[lang].noStatus;
    }
    if (item.subsection_our_code === 'fitting') {
        status = null;
    }
    return {
        link: `${subgroup}/${item.subsection_our_code}`,
        linkName: item.title[lang],
        id: item.subsection_our_code,
        isSubclear: item.is_subclear,
        isInput: item.is_input,
        status,
        subgroupTitle: item.title,
        ourCode: ourCode,
        defaultCode: defaultCode,
    };
};

@inject((
    {
        app,
        user,
        garments: { Subgroups },
        order,
        routing:
        { location: { pathname } } },
    nextProps: SubgroupChoiceProps) => ({
        lang: app.lang,
        SubgroupsStore: new Subgroups(nextProps.match.params.garment),
        order: order.order,
        // defaultValues: order.defaultValues ? order.defaultValues![nextProps.match.params.garment] : {},
        defaultValues: order.defaultValues ? order.defaultValues![nextProps.match.params.garment][0] : {},
        // defaultValues: nextProps.match.params.garment, // <--- Нет идей зачем это, поставил заглуш
        userStore: user,
        activeExceptions: order.exceptions,
        setSubgroupTitle: order.setSubgroupTitle,
        choiceItem: [...app.orderPath].pop(),
        popOrderPathitem: app.popOrderPathItem,
        backLink:
            '/' + trim(
                pathname
                    .split('/')
                    .reduce(
                        (acc: string,
                            cur: string,
                            i: number,
                            arr: string[]) => `${acc}/${i === arr.length - 1 ? '' : cur}`, ''),
                '/'),
        ...nextProps,
    }))
@observer
class SubgroupChoice extends React.Component<SubgroupChoiceProps> {
    getSnapshotBeforeUpdate(prevProps: SubgroupChoiceProps) {
        // save scroll position for design block
        const {
            history: { action },
            location: { pathname }
        } = prevProps;
        if (action !== 'POP' && pathname.includes('design') || pathname.includes('fitting')) {
            const choiceItemsEl = document.querySelector('.customs.customs--short');
            scrollData = {
                ...scrollData,
                [pathname]: choiceItemsEl && choiceItemsEl.scrollTop || 0,
            };
        } else {
            scrollData = {
                [pathname]: 0,
            };
        }
        return null;
    }

    componentDidUpdate() {
        const {
            history: { action },
            location: { pathname }
        } = this.props;
        if (action === 'PUSH' && scrollData[pathname]) {
            const choiceItemsEl = document.querySelector('.customs.customs--short');
            if (choiceItemsEl) {
                // restore scroll position for design block
                choiceItemsEl.scrollTo({
                    left: 0,
                    top: scrollData[pathname],
                });
            }
        }
    }

    render() {
        const {
            lang,
            SubgroupsStore,
            match,
            match: { params: { garment } },
            order,
            choiceItem,
            popOrderPathitem,
            backLink,
            setSubgroupTitle,
            defaultValues
        } = this.props;
        const $store = SubgroupsStore.data as SubgroupsI;

        const data = $store
            ? [
                ...$store.design.map((v: Subgroup) => filterFields(
                    v,
                    'design',
                    lang!,
                    order!,
                    garment,
                    defaultValues
                )),
            ]
            : [];

        const dataFitting = $store
            ? [
                ...$store.fitting.map((v: Subgroup) => filterFields(
                    v,
                    'fitting',
                    lang!,
                    order!,
                    'shirt',
                    defaultValues
                )),
            ]
            : [];

        return (
            <Switch>
                <Route
                    path={`${match.path}/:subgroup/:group`}
                    render={(props) => {
                        const _match = props.match;
                        return (
                            <GroupChoice
                                match={_match}
                                popOrderPathitem={popOrderPathitem!}
                                setSubgroupTitle={setSubgroupTitle!}
                                backLink={backLink!}
                                choiceItem={choiceItem!}
                                lang={lang!}
                                order={order!}
                                withToggle={true}
                            />
                        );
                    }}
                />
                <Route
                    exact={true}
                    path={routes.design}
                    render={(props) => {
                        const _match = props.match;
                        return (
                            <>
                                {isMobile() && <GroupChoice
                                    match={_match}
                                    popOrderPathitem={popOrderPathitem!}
                                    setSubgroupTitle={setSubgroupTitle!}
                                    backLink={backLink!}
                                    choiceItem={choiceItem!}
                                    lang={lang!}
                                    order={order!}
                                    withToggle={false}
                                />}
                                <div className={'nav-overflow'}>
                                    <div className={'design-navigation-wrapper'}>
                                        <Link to={match.url} className={'design-navigation _active'}>Все</Link>
                                        {data.map(item => (
                                            <Link to={`${match.url}/${item.link}`} className={'design-navigation '}>
                                                {item.linkName}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <Component lang={lang} match={match} data={data} />
                            </>
                        );
                    }}
                />
                <Route
                    exact={true}
                    path={routes.fitting}
                    render={(props) => {
                        const _match = props.match;
                        return (
                            <>
                                {isMobile() && <GroupChoice
                                    match={_match}
                                    popOrderPathitem={popOrderPathitem!}
                                    setSubgroupTitle={setSubgroupTitle!}
                                    backLink={backLink!}
                                    choiceItem={choiceItem!}
                                    lang={lang!}
                                    order={order!}
                                    withToggle={false}
                                />}
                                <div className={'design-navigation-wrapper'}>
                                    <Link to={match.url} className={'design-navigation _active'}>Все</Link>
                                    {dataFitting.map(item => (
                                        <Link to={`${match.url}/${item.link}`} className={'design-navigation '}>
                                            {item.linkName}
                                        </Link>
                                    ))}
                                </div>
                                <Component lang={lang} match={match} data={dataFitting} />
                            </>
                        );
                    }}
                />
                <Redirect to={match.url} />
            </Switch>);
    }
}

export {
    SubgroupChoice,
};
