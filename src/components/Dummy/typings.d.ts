type P = {
    order?: Order;
    orderStore?: OrderStore;
    imageCount: number;
    img: number;
    imageYOffset: number;
    scaleCoefficient: number;
    previewElement: ActivePreviewElement;
    onMouseLeave(e: React.MouseEvent<HTMLUnknownElement>): void;
    onMouseMove(e: React.MouseEvent<HTMLUnknownElement>): void;
    onMouseUp(e: React.MouseEvent<HTMLUnknownElement>): void;
    onMouseDown(e: React.MouseEvent<HTMLUnknownElement>): void;
    // onWheelCapture(e: React.MouseEvent<HTMLUnknownElement>): void;
    onWheelCapture: any;
};

type S = {
    loadingsCount: number;
    progress: number;
};
