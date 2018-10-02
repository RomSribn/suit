import * as React from 'react';
import * as classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ConfirmPopup } from '../ConfirmPopup';
import { routes } from '../../config/routes';

import './panelRowStyles.css';
import './panelRowStyles.styl';

interface PanelRowProps {
    orderId: string | null;
}

interface PanelRowState {
    showControls: boolean;
}

class PanelRow extends React.PureComponent<PanelRowProps, PanelRowState> {
    constructor(props: PanelRowProps) {
        super(props);
        this.state = {
            showControls: false
        };
    }
    triggerControls = (showControlsBoolValue?: boolean) => {
        const {
            showControls
        } = this.state;
        this.setState({
            showControls: showControlsBoolValue || !showControls
        });
    }
    render() {
        const {
            orderId
        } = this.props;
        const {
            showControls
        } = this.state;
        const itemClassName = classNames('controls__item', { disabled: !Boolean(orderId) });
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
                            onFocus={() => this.setState({showControls: false })}
                            onBlur={() => this.setState({showControls: true })}
                        />
                        <span
                            className="icon-close search__clear"
                            title="Clear"
                            style={{ visibility: 'hidden'}}
                        />
                    </div>
                </form>
                <div className={classNames('controls', { hidden: !showControls})}>
                    <ul className="controls__list">
                        <li className="controls__item disabled">
                            <a
                                className="controls__link controls__link--phone"
                                href="#"
                                title="звонок"
                            />
                        </li>
                        <li className="controls__item disabled">
                            <a
                                className="controls__link controls__link--msg"
                                href="#"
                                title="сообщения"
                            />
                        </li>
                        <li className={itemClassName}>
                            <Link
                                className="controls__link controls__link--refresh"
                                to={{
                                    pathname: `${routes.details}/shirt`,
                                    search: `order_id=${orderId}`
                                }}
                                title=""
                            />
                        </li>
                        <li className={itemClassName}>
                            <ConfirmPopup>
                                <button
                                    className="controls__link controls__link--eye"
                                />
                            </ConfirmPopup>
                        </li>
                        <li className={itemClassName}>
                            <a
                                className="controls__link controls__link--edit"
                                href="#"
                                title="редактировать"
                            />
                        </li>
                        <li className={itemClassName}>
                            <a
                                className="controls__link controls__link--trash"
                                href="#"
                                title="удалить"
                            />
                        </li>
                        <li className={itemClassName}>
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
