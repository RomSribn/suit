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
            <div className="header">{loc[lang].header}</div>
            <div className="text">{loc[lang].infoText}</div>
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
                            <InfoBlock lang={lang} />                        
                            <form
                                onSubmit={handleSubmit}
                                className=""
                            >
                                {FIELDS.map((field) => (
                                    <Field
                                        name={field.name}
                                        required={Boolean(field.required)}
                                        component={field.component}
                                        type={field.type}
                                        placeholder={loc[lang].placeHolders[field.name]}
                                    />
                                ))}
                                <div className="buttons">
                                    <Button type="submit" theme="white">
                                        {loc[lang].sendOrder}
                                    </Button>
                                    <Button theme="black" type="submit" onClick={this.props.close}>
                                        {loc[lang].backText}
                                    </Button>
                                </div>
                            </form>
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
