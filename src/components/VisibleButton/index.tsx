import * as React from 'react';

const VisibleButton = ({ isHide }: IVisibleButtonProps) => {
    const [isAnimated, setIsAnimated] = React.useState(false);

    const onClick = () => {
        setIsAnimated(true);
    };

    // Remove all after animation ends
    const removeAnimate = () => {
        setIsAnimated(false);
    };

    return (
        <div className="visible-button">
            <div
                className="ripple"
                onAnimationEnd={removeAnimate}
            />
            <div
                className={`visible-button__toggle ${!isAnimated && 'animated'}`}
                data-state={isHide ? 'visible' : 'hidden'}
                onClick={onClick}
                style={{
                    pointerEvents: !isAnimated ? 'all' : 'initial'
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="eye" width="32" height="32">
                    <circle cx="16" cy="15" r="2" />
                    <path
                        d="M30 16s-6.268 7-14 7-14-7-14-7 6.268-7 14-7 14 7 14 7zM22.772 10.739a8 8 0 1 1-13.66.189"
                    />
                </svg>
            </div>
        </div>
    );
};

export { VisibleButton };