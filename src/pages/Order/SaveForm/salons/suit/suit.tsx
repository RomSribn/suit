import * as React from 'react';
import { Form, Field } from 'react-final-form';
import { translations as loc } from './suit.loc';
import { Button } from '../../../../../components/Button';

import './suit.styles.styl';
import { Redirect } from 'react-router';
import InputMask from 'react-input-mask';
import * as classnames from 'classnames';
import { Link } from 'react-router-dom';
import { PopUp } from '../../../../../containers/Popup';
import Login from '../../../../../components/Login';

const validatePhone = (lang: string) => (value: string) => {
    if (!value) {
        return loc[lang].required;
    }
    if (value && value.length < 12) {
        return loc[lang].phoneRequirements;
    }
};

const FIELDS: Field[] = [{
    name: 'phone',
    parse: (value: string) => value.replace(/[^+\d]/g, ''),
    // tslint:disable-next-line:no-any
    render: (props: any) => {
        return (
            <>
                <InputMask
                    disabled={false}
                    mask="+7 (999) 999-99-99"
                    {...props.input}
                    className={props.className}
                    placeholder={props.placeholder}
                    required={true}
                />
                {props.meta.error && props.meta.touched && <div className="order-form__error">{props.meta.error}</div>}
            </>
        );
    },
    validate: validatePhone,
    type: 'phone',
}, {
    name: 'name',
    type: 'text',
    // tslint:disable-next-line:no-any
    render: (props: any) => {
        return (
            <>
                <input {...props.input} className={props.className} placeholder={props.placeholder} required={true} />
                {props.meta.error && props.meta.touched && <div className="order-form__error">{props.meta.error}</div>}
            </>
        );
    },
    validate: (lang: string) => (value: string) => (value ? null : loc[lang].required),
}, {
    name: 'email',
    required: false,
    component: 'input',
    type: 'email',
},
];

class SaveForm extends React.PureComponent<FormProps, { showThanks: boolean, showLoginForm?: boolean }> {
    state = {
        showThanks: false,
        showLoginForm: false,
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

    loginLinkClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (this.props.close) {
            this.props.close();
            setTimeout(() => {
                this.setState({
                    showLoginForm: true,
                });
            }, 300);
        }
    }

    closeForm = () => {
        this.setState({ showLoginForm: false });
    }

    render() {
        const {
            lang
        } = this.props;
        const state = this.state;

        const content = state.showThanks
            // ? (<span>{loc[lang].thanksText}</span>)
            ? (
                <>
                    <span className="order-form__subtitle">{loc[lang].thanksText}</span>
                    <Redirect to="#thank_you" />
                </>
            )
            : (
                <>
                    <div className="order-form">
                        {FIELDS.map((field) => (
                            <div className="order-form__item" key={`field-${field.name}`}>
                                <Field
                                    className="order-form__input"
                                    name={field.name}
                                    required={Boolean(field.required)}
                                    component={field.component}
                                    type={field.type}
                                    placeholder={loc[lang].placeHolders[field.name]}
                                    key={`field-${field.name}`}
                                    render={field.render}
                                    parse={field.parse}
                                    validate={field.validate && field.validate(lang)}
                                />
                            </div>

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
                        <div
                            className={classnames(
                                'order-form__container',
                                { 'black-bg': state.showThanks },
                            )}
                        >
                            <div className="order-form__content">
                                <div>
                                    <div className="order-form__header">
                                        {state.showThanks ? loc[lang].thanksHeader : loc[lang].header}
                                    </div>
                                    {!state.showThanks && (
                                        <div>
                                            <Link to="#" onClick={this.loginLinkClick} className="order-form__text">
                                                {loc[lang].infoText}
                                            </Link>
                                            <PopUp
                                                open={this.state.showLoginForm}
                                                onClose={this.closeForm}
                                            ><Login loginCallback={this.closeForm} closeForm={this.closeForm} />
                                            </PopUp>
                                        </div>
                                    )}
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