import * as React from 'react';
import { Form, Field } from 'react-final-form';
import { translations as loc } from './suit.loc';
import { Button } from '../../../../../components/Button';

import './suit.styles.styl';
import { Redirect } from 'react-router';

const FIELDS: Field[] = [{
    name: 'phone',
    required: true,
    component: 'input',
    type: 'phone',
}];

class SaveForm extends React.PureComponent<FormProps, {showThanks: boolean}> {
    state = {
        showThanks: false
    };
    onSubmit = (userInfo: User) => {
        this.props.orderStore.saveOrder(userInfo)
            .then(() => {
                this.setState({
                    showThanks: true,
                });
                if (this.props.close) {
                    const close = this.props.close;
                    setTimeout(() => {
                        close();
                        this.setState({
                            showThanks: false,
                        });
                    }, 3000);
                }
            });
    }

    render() {
        const {
            lang
        } = this.props;
        const state = this.state;

        const content  = state.showThanks
            // ? (<span>{loc[lang].thanksText}</span>)
            ? (
                <>
                    <span>{loc[lang].thanksText}</span>
                    <Redirect to="#thank_you"/>
                </>
            )
            : (
                <>
                    <div className="order-form">
                        {FIELDS.map((field) => (
                            <Field
                                className="order-form__input"
                                name={field.name}
                                required={Boolean(field.required)}
                                component={field.component}
                                type={field.type}
                                placeholder={loc[lang].placeHolders[field.name]}
                                key={`field-${field.name}`}
                            />
                        ))}
                        <div className="buttons">
                            <Button type="submit" theme="black">
                                {loc[lang].sendOrder}
                            </Button>
                        </div>
                    </div>
                    <div className="order-form__agreement-container">
                        <input
                            className="order-form__agreement"
                            type="checkbox"
                            required={true}
                            id="order-confirmation"
                            style={{
                                marginRight: 10
                            }}
                        />
                        <label htmlFor="order-confirmation">
                            <span className="order-confirmation__text">{loc[lang].licenseAgreement} <a
                                className="order-confirmation__link"
                                href={`/personal_dates.${lang}.` + process.env.SALON_ID + '.pdf'}
                                target="_blank"
                            >{loc[lang].personalData}
                            </a></span>
                        </label>
                    </div>
                </>
            );

        return (
            <Form
                onSubmit={this.onSubmit}
                render={({ handleSubmit }) => {
                    return (
                        <div className="order-form__container">
                            <div className="order-form__content">
                                <div>
                                    <div className="order-form__header">{loc[lang].header}</div>
                                    {!state.showThanks && <div className="order-form__text">{loc[lang].infoText}</div>}
                                </div>
                                <form
                                    onSubmit={handleSubmit}
                                    className=""
                                >
                                    {content}
                                </form>
                            </div>
                        </div>
                    );
                }}
            />
        );
    }
}

export {
    SaveForm
};
