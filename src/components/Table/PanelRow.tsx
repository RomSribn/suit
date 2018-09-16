import * as React from 'react';
import * as classNames from 'classnames';
import './panelRowStyles.css';

interface PanelRowProps {
    orderId: string | null;
}

class PanelRow extends React.PureComponent<PanelRowProps, {showcontrols: boolean}> {
    constructor(props: PanelRowProps) {
        super(props);
        this.state = {
            showcontrols: true
        };
    }
    render() {
        return (
            <div className="panel-row">
                <form className="search">
                    <div className="search__control">
                        <span className="search__icon" />
                        <input
                            type="search"
                            maxLength={150}
                            autoComplete="off"
                            className="search__input"
                            placeholder="Поиск ..."
                            onFocus={() => this.setState({showcontrols: false })}
                            onBlur={() => this.setState({showcontrols: true })}
                        />
                        <span
                            className="icon-close search__clear"
                            title="Clear"
                            style={{ visibility: 'hidden'}}
                        />
                    </div>
                </form>
                <div className={classNames('controls', { hidden: !this.state.showcontrols})}>
                    <ul className="controls__list">
                        <li className="controls__item">
                            <a
                                className="controls__link controls__link--phone"
                                href="#"
                                title="звонок"
                            />
                        </li>
                        <li className="controls__item">
                            <a
                                className="controls__link controls__link--msg"
                                href="#"
                                title="сообщения"
                            />
                        </li>
                        <li className="controls__item">
                            <a
                                className="controls__link controls__link--refresh"
                                href="#"
                                title=""
                            />
                        </li>
                        <li className="controls__item">
                            <a
                                className="controls__link controls__link--eye"
                                href="#"
                                title=""
                            />
                        </li>
                        <li className="controls__item">
                            <a
                                className="controls__link controls__link--edit"
                                href="#"
                                title="редактировать"
                            />
                        </li>
                        <li className="controls__item">
                            <a
                                className="controls__link controls__link--trash"
                                href="#"
                                title="удалить"
                            />
                        </li>
                        <li className="controls__item">
                            <a
                                className="controls__link controls__link--pdf"
                                href="#"
                                title="pdf"
                            />
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export {
    PanelRow
};