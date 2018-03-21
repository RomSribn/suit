import * as React from 'react';

class GroupChoice extends React.PureComponent<GroupChoiceProps> {
    constructor(props: GroupChoiceProps) {
        super(props);
        this.state = {

        };
    }
    render() {
        const {
        } = this.props;
        return (
            <div>
                <div className="custom">
                    <span className="custom__name">ткань:</span>
                    <span className="custom__status">Redo France Mantadore 1194</span>
                </div>
            </div>
        );
    }
}

export {
    GroupChoice,
};