import * as React from 'react';
import { Link } from 'react-router-dom';
import * as classNames from 'classnames';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { TRANSITION_DUARAION } from '../../../config/constants';
import { ADD, REMOVE } from '../../../stores/garments/garments';
import { CatalogIntroText } from '../CatalogIntroText';
import { makeRoutes } from '../routes';
import { loc } from './loc';

type MakeCatalogItems = (
    g: Garments,
    lang: string,
    activeGarments: string[],
    toggle: (g: string) => (e: any ) => void) => React.ReactNode[]; // tslint:disable-line
const makeCatalogItems: MakeCatalogItems = (garments, lang, activeGarments, toggle) => Object
    .keys(garments)
    .map(garment => {
        return garment !== 'design' ? (
            <label className="catalog__item" key={garment}>
                <input
                    type="checkbox"
                    name="goods"
                    checked={activeGarments.includes(garment)}
                    value={garment}
                    // onClick={(e) => { e.preventDefault(); }}
                    onChange={toggle(garment)}
                />

                <span className="catalog__item-decoration">
                <ReactCSSTransitionGroup
                    transitionName="fade-in-absolute"
                    transitionEnterTimeout={TRANSITION_DUARAION}
                    transitionLeaveTimeout={TRANSITION_DUARAION}
                >
                <span key={lang}>
                {
                    garments[garment].titles
                        ? garments[garment].titles![lang]
                            ? garments[garment].titles![lang]
                            : garment
                        : garment
                }
                </span>
                </ReactCSSTransitionGroup>
                </span>
                
            </label>
        ) : null;
    });
interface State {
    garmentChoiceFormHeight: number;
}
class GarmentChoise extends React.Component<GarmentChoiceFormProps, State> { 
    static defaultProps = {
        lang: 'en',
        garments: {},
        fetchGarments: () => undefined,
        toggleGarment: () => () => {}, // tslint:disable-line
        pushOrderPathitem: () => undefined,
    };
    constructor(props: GarmentChoiceFormProps) {
        super(props);
        this.state = {
            garmentChoiceFormHeight: 0,
        };
    }
    componentWillMount() {
        this.props.fetchGarments!();
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
            lang,
            // orderStore,
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
            catalogFormClassName,
            activeGarments,
            isIndexPage,
        } = this.props;
        return (
            <div
                className={classNames(
                'catalog',
                {
                    ['catalog--top-position']: !isIndexPage,
                },
                )}
                style={ !isIndexPage ? {
                    marginBottom: 0,
                } : {}}
            >
            
                <form
                    className={`catalog__form ${catalogFormClassName}`}
                    style={
                        isIndexPage
                         ? {}
                         : {
                            maxHeight: this.state.garmentChoiceFormHeight,
                            transition: 'max-height .3s',
                            overflow: 'hidden',
                            }
                    }
                >
                    {   isIndexPage &&
                        <CatalogIntroText lang={lang!}/>
                    }
                    <div className="catalog__form-wrap">
                        {makeCatalogItems(garments!, lang!, activeGarments!, this.toggle)}
                    </div>
                    {   isIndexPage &&
                        <div className="catalog__submit-bar">
                            <ReactCSSTransitionGroup
                                transitionName="fade-in-absolute"
                                transitionEnterTimeout={TRANSITION_DUARAION}
                                transitionLeaveTimeout={TRANSITION_DUARAION}
                            >
                                <Link
                                    to="/order/details"
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
                                        <svg width="100%" height="100%">
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
                                </Link>
                            </ReactCSSTransitionGroup>
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