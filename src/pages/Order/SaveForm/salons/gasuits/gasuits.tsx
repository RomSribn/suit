import * as React from 'react';
import { Form, Field } from 'react-final-form';
import { translations as loc } from './gasuits.loc';
import { Button } from '../../../../../components/Button';

import './gasuits.styles.styl';

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
            ? (<span>{loc[lang].thanksText}</span>)
            : (
                <>
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
                                    className="order-form"
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
