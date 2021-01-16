import * as React from 'react';
import * as classNames from 'classnames';
import { ADD, REMOVE } from '../../../stores/garments/garments';
import { CatalogIntroText } from '../CatalogIntroText';
import { FadeIn } from '../../../containers/Transitions';
import { Link } from 'react-router-dom';
import { loc } from './loc';
import { makeRoutes } from '../routes';
import { routes } from '../../../config/routes';
import history from '../../../history';
import { GarmentViewController } from '../GarmentViewController';

const isRealIndexPage = () => window.location.pathname === routes.mainPage;

type MakeCatalogItems = (
    g: Garments,
    lang: string,
    currentActiveGarment: string[],
    activeGarments: string[],
    setCurrentActiveGarment: (g: string) => void,
    toggle: (g: string) => (e: any) => void, // tslint:disable-line
    isNavigationGarments?: boolean) => React.ReactNode[];
const makeCatalogItems: MakeCatalogItems = (
    garments,
    lang,
    currentActiveGarment,
    activeGarments,
    setCurrentActiveGarment,
    toggle,
    isNavigationGarments) => Object
        .keys(garments)
        .map(garment => {
            const isNavSkip = !isNavigationGarments || activeGarments.includes(garment);
            const firstCurrentActiveGarment = currentActiveGarment[0] || activeGarments[0];
            return garment !== 'design' && isNavSkip ? (
                <label
                    className="catalog__item"
                    key={garment}
                    style={{
                        width: isRealIndexPage() ? '35%' : '14rem'
                    }}
                >
                    <input
                        type="checkbox"
                        name="goods"
                        checked={
                            isNavigationGarments ?
                                firstCurrentActiveGarment === garment :
                                activeGarments.includes(garment)
                        }
                        value={garment}
                        onClick={(e) => {
                            if (isNavigationGarments) {
                                history
                                    .push(window.location.pathname
                                        .replace(
                                            firstCurrentActiveGarment
                                            , garment));
                                setCurrentActiveGarment(garment);
                            }
                        }}
                        onChange={(e) => {
                            if (!isNavigationGarments) {
                                toggle(garment)(e);
                            }
                        }}
                    />

                    <span className="catalog__item-decoration">
                        <FadeIn>
                            <span key={lang}>
                                {
                                    garments[garment] &&
                                    garments[garment][`name${lang.charAt(0).toUpperCase() + lang.slice(1)}`]
                                    || garments[garment].name
                                }
                            </span>
                        </FadeIn>
                    </span>

                </label>
            ) : null;
        });
interface State {
    garmentChoiceFormHeight: number;
    showUnavailablePopup: boolean;
}
class GarmentChoise extends React.Component<GarmentChoiceFormProps, State> {
    static defaultProps = {
        lang: 'en',
        garments: {},
        fetchGarments: () => undefined,
        toggleGarment: () => () => { }, // tslint:disable-line
        pushOrderPathitem: () => undefined,
    };
    constructor(props: GarmentChoiceFormProps) {
        super(props);
        this.state = {
            garmentChoiceFormHeight: 0,
            showUnavailablePopup: false,
        };
    }
    componentWillMount() {
        if (!Object.keys(this.props.garments!).length) {
            this.props.fetchGarments!();
        }
    }
    componentDidMount() {
        const DOMElemtnt = document.getElementsByClassName('catalog__form')[0];
        const commonHeight = Array.from(DOMElemtnt.children).reduce((acc, child) => {
            acc += child.clientHeight;
            return acc;
        }, 0);
        if (commonHeight !== this.state.garmentChoiceFormHeight) {
            this.setState({
                garmentChoiceFormHeight: commonHeight,
            });
        }
    }
    componentDidUpdate() {
        const DOMElemtnt = document.getElementsByClassName('catalog__form')[0];
        const commonHeight = Array.from(DOMElemtnt.children).reduce((acc, child) => {
            acc += child.clientHeight;
            return acc;
        }, 0);
        if (commonHeight !== this.state.garmentChoiceFormHeight) {
            this.setState({
                garmentChoiceFormHeight: commonHeight,
            });
        }
    }
    makeOrder = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const {
            activeGarments,
            makeOrder,
            pushOrderPathitem,
            lang
        } = this.props;
        if (!activeGarments!.length) {
            e.preventDefault();
        } else {
            makeOrder!(activeGarments!);
            pushOrderPathitem!({
                value: loc[lang!].pathItemValue,
                link: makeRoutes().details,
            });
        }
    }
    activate = (garment: string) => {
        this.props.toggleGarment!(ADD)(garment);
    }
    remove = (garment: string) => {
        this.props.toggleGarment!(REMOVE)(garment);
    }
    toggle = (garment: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            this.activate(garment);
        } else {
            this.remove(garment);
        }
    }
    render() {
        const {
            lang,
            garments,
            activeGarments,
            isNavigationGarments,
            currentActiveGarment,
            setCurrentActiveGarment
        } = this.props;
        return (
            <div
                className={classNames(
                    'catalog',

                    'catalog--top-position',

                )}
            >

                <form
                    className={`catalog__form`}
                    style={
                        isRealIndexPage()
                            ? {}
                            : {
                                transition: 'max-height .3s',
                                overflow: 'hidden',
                                marginBottom: 0,
                                display: 'flex',
                                alignItems: 'center'
                            }
                    }
                >
                    {isRealIndexPage() &&
                        <CatalogIntroText lang={lang!} />
                    }
                    <div
                        className="catalog__form-wrap"
                        style={{
                            width: !isRealIndexPage() ? 'auto' : '100%'
                        }}
                    >
                        {makeCatalogItems(
                            garments!,
                            lang!,
                            [currentActiveGarment!],
                            activeGarments!,
                            setCurrentActiveGarment!,
                            this.toggle!,
                            isNavigationGarments)}
                    </div>
                    {!isRealIndexPage() && (
                        <GarmentViewController />
                    )}
                    {isRealIndexPage() &&
                        <div className="catalog__submit-bar">
                            <FadeIn>
                                {!isMobile() ? <Link
                                    to={`order/details/${currentActiveGarment}/fabric_ref/fabric`}
                                    key={lang}
                                    onClick={this.makeOrder}
                                    className="catalog__submit"
                                >
                                    {loc[lang!].submit}
                                    <div className="catalog__submit-lines-group">
                                        <div className="catalog__submit-line catalog__submit-line--1" />
                                        <div className="catalog__submit-line catalog__submit-line--2" />
                                        <div className="catalog__submit-line catalog__submit-line--3" />
                                    </div>
                                    <div className="catalog__submit-frame">
                                        <svg width="calc(31% + 1px)" height="100%">
                                            <rect
                                                className="catalog__submit-rect catalog__submit-rect--1"
                                                width="100%"
                                                height="100%"
                                            />
                                            <rect
                                                className="catalog__submit-rect catalog__submit-rect--2"
                                                width="100%"
                                                height="100%"
                                            />
                                        </svg>
                                    </div>
                                </Link> :
                                    <Link
                                        to={`order/details/${currentActiveGarment}/fabric_ref/fabric`}
                                        key={lang}
                                        onClick={this.makeOrder}
                                        style={{
                                            width: '100%',
                                            height: 'unset'
                                        }}
                                        className="catalog__submit--mobile catalog__item-decoration"
                                    >
                                        {loc[lang!].submit}
                                    </Link>}
                            </FadeIn>
                        </div>
                    }
                </form>
            </div>
        );
    }
}

export {
    GarmentChoise,
};