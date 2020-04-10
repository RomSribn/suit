import * as React from 'react';

import './panelRowStyles.styl';

interface PanelRowState {
    showControls: boolean;
}

class PanelRow extends React.PureComponent<PanelRowCustomersProps, PanelRowState> {
    constructor(props: PanelRowCustomersProps) {
        super(props);
        this.state = {
            showControls: Boolean(this.props.activeCustomerId)
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
            </div>
        );
    }
}

export {
    PanelRow
};
