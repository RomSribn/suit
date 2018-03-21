import * as React  from 'react';

const Demo = () => (
    <div className="main-page-title">
        <div className="main-page-title__wrap">
            <div
                className="main-page-title__row"
                id="js-word-1"
            >
                <img
                    src={process.env.STATIC_IMAGES + 'main-slogan/meets.svg'}
                    alt="suit"
                />
            </div>
            <div
                className="main-page-title__row"
                id="js-word-2"
            >
                <img src={process.env.STATIC_IMAGES + 'main-slogan/suit.svg'} alt="meets" />
            </div>                        
            <div
                className="main-page-title__row"
                id="js-word-3"
            >
                <img
                    src={process.env.STATIC_IMAGES + 'main-slogan/fashion.svg'}
                    alt="fashion"
                />
            </div>
        </div>
    </div>);
const Paralax = () => {
    return (
    <div className="paralax-bg" id="js-paralax-bg">
        <div className="paralax-bg__pic" id="js-paralax-img">
            <video
                muted={true}
                className="video-block"
                id="video"
                autoPlay={true}
                loop={true}
                preload="auto"
            >
                <source src={process.env.STATIC_VIDEOS + 'video.mp4'} type="video/mp4" />
                <source src={process.env.STATIC + 'video/video.webm'} type="video/webm" />
                <source src={process.env.STATIC + 'video/video.ogv'} type="video/ogg" />
            </video>
        </div>
        <svg id="js-paralax-rect" className="paralax-bg__rect">
            <rect width="177" height="100" />
            <rect width="177" height="100" />
        </svg>
    </div>);
};
    
export {
    Demo,
    Paralax,
};