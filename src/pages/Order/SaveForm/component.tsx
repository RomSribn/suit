import * as React from 'react';
import { Form, Field } from 'react-final-form';
import { translations as loc } from './loc';
import { Button } from '../../../components/Button';

import './style.styl';

const FIELDS: Field[] = [{
    name: 'name',
    required: true,
    component: 'input',
    type: 'text',
}, {
    name: 'phone',
    required: true,
    component: 'input',
    type: 'phone',
}, {
    name: 'email',
    component: 'input',
    type: 'email'
}];

const InfoBlock = (props: { lang: string }) => {
    const { lang } = props;
    return (
        <div>
            <div className="order-form__header">{loc[lang].header}</div>
            <div className="order-form__text">{loc[lang].infoText}</div>
        </div>
    );
};

class SaveForm extends React.PureComponent<FormProps> {
    onSubmit = (userInfo: User) => {
        this.props.orderStore.saveOrder(userInfo)
        .then(() => {
            if (this.props.close) {
                this.props.close();
            }
        });
    }
    render() {
        const {
            lang
        } = this.props;
        return (
            <Form
                onSubmit={this.onSubmit}
                render={({ handleSubmit }) => {
                    return (
                        <div className="order-form__container">
                            <div className="order-form__content">
                                <InfoBlock lang={lang} />                        
                                <form
                                    onSubmit={handleSubmit}
                                    className="order-form"
                                >
                                    {FIELDS.map((field) => (
                                        <Field
                                            className="order-form__input"
                                            name={field.name}
                                            required={Boolean(field.required)}
                                            component={field.component}
                                            type={field.type}
                                            placeholder={loc[lang].placeHolders[field.name]}
                                        />
                                    ))}
                                    <div className="buttons">
                                        <Button type="submit" theme="black">
                                            {loc[lang].sendOrder}
                                        </Button>
                                        <Button theme="white" type="submit" onClick={this.props.close}>
                                            {loc[lang].backText}
                                        </Button>
                                    </div>
                                </form>
                                <div className="foot-note">* autumn 2017 Louis Purple</div>
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
