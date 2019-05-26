import * as React from 'react';
import { loc as commonLoc } from './loc';

export interface Props {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    placeholder?: string;
    lang: Lang;
}

const InitialsCustomInput: React.FunctionComponent<Props> = (props) => {
    const loc = commonLoc[props.lang];
    return (
        <div className="custom custom__no-pointer">
            <span className="custom__content">
                <span
                    className="custom__name"
                    style={{
                        color: 'black',
                    }}
                >
                    {loc.title}:
                </span>
                <span className="custom__status">
                    <input
                        type="text"
                        onChange={props.onChange}
                        maxLength={8}
                        onBlur={props.onBlur}
                        placeholder={props.placeholder || loc.placeholder}
                    />
                </span>

            </span>
        </div>
    );
};

export {
    InitialsCustomInput
};