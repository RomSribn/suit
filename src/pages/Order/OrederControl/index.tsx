import * as React from 'react';
import { FooterBar } from '../FooterBar';
import { OrderInfo } from '../OrderInfo';

const OrderControl = () => {
    return (
    <div className="main__footer">
        <OrderInfo />
        <FooterBar />
    </div>);
};

export {
    OrderControl,
};