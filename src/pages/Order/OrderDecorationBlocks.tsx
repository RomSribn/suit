import * as React from 'react';
import { isMobile } from '../../utils';

const Demo = () => (
    <div style={isMobile() ? { display: 'none' } : {}} className="main-page-title">
        <div className="main-page-title__wrap">
            <div
                className="main-page-title__row"
                id="js-word-1"
            >
                {<img
                    className="main-page-title__slogan-parts"
                    src={process.env.STATIC_IMAGES + 'main-slogan/meets.svg'}
                    alt="suit"
                />}
            </div>
            <div
                className="main-page-title__row"
                id="js-word-2"
            >
                {<img
                    className="main-page-title__slogan-parts"
                    src={process.env.STATIC_IMAGES + 'main-slogan/suit.svg'}
                    alt="meets"
                />}
            </div>
            <div
                className="main-page-title__row"
                id="js-word-3"
            >
                {<img
                    className="main-page-title__slogan-parts"
                    src={process.env.STATIC_IMAGES + 'main-slogan/fashion.svg'}
                    alt="fashion"
                />}
            </div>
        </div>
    </div>);
class Paralax extends React.PureComponent {
    listener: (e: MouseEvent) => void;
    componentDidMount() {
        if (document.getElementById('js-paralax-bg')) {
            const paralaxBlc = document.getElementById('js-paralax-bg') as HTMLElement,
                paralaxImg = document.getElementById('js-paralax-img') as HTMLElement,
                paralaxRect = document.getElementById('js-paralax-rect') as HTMLElement,
                word1 = document.getElementById('js-word-1') as HTMLElement,
                word3 = document.getElementById('js-word-3') as HTMLElement,
                boxerCenterX = paralaxBlc.offsetLeft + (paralaxBlc.offsetWidth / 2),
                boxerCenterY = paralaxBlc.offsetTop + (paralaxBlc.offsetHeight / 2);

            const getMousePos = (xRef: number, yRef: number) => {
                let panelRect = paralaxBlc.getBoundingClientRect();
                return {
                    x: Math.floor(xRef - panelRect.left) / (panelRect.right - panelRect.left) * paralaxBlc.offsetWidth,
                    y: Math.floor(yRef - panelRect.top) / (panelRect.bottom - panelRect.top) * paralaxBlc.offsetHeight
                };
            };
            const listener = (e: MouseEvent) => {
                let mousePos = getMousePos(e.clientX, e.clientY),
                    distX = mousePos.x - boxerCenterX,
                    distY = mousePos.y - boxerCenterY;
                paralaxRect.style.marginRight = `${distX / 40}px`;
                paralaxRect.style.marginBottom = `${distY / 40}px`;
                paralaxImg.style.transform =
                    `translate(0px, 0px) matrix(1, 0, 0, 1, ${-distX / 50}, ${-distY / 50})`;
                // "translate(0px, 0px) matrix(1, 0, 0, 1, " + -(distX/50) + ", " + -(distY/50) + ")";

                if (word1) {
                    word1.style.transform = `translateX(${-distX / 50}px)`;
                }
                // word1.style.transform = "translateX(" + -(distX/50) + "px)";

                // word1.style.transform = "translateX(" + distX/50 + "px)";

                if (word3) {
                    word3!.style.transform = `translateX(${-distX / 50}px)`;
                }
                // word3.style.transform = "translateX(" + -(distX/50) + "px)";
            };
            this.listener = listener;
            document.body.addEventListener('mousemove', listener);

        }
    }
    componentWillUnmount() {
        document.body.removeEventListener('mousemove', this.listener);
    }
    render() {
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
                {!isMobile() ?
                    <svg id="js-paralax-rect" className="paralax-bg__rect">
                        <rect width="177" height="100" />
                        <rect width="177" height="100" />
                    </svg> : <svg id="js-paralax-rect" className="paralax-bg__rect">
                        <rect width="277" height="200" />
                        <rect width="277" height="200" />
                    </svg>
                }
            </div>);
    }
}

export {
    Demo,
    Paralax,
};