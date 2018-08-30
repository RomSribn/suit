// import * as React from 'react';
// // import * as ReactDOM from 'react-dom';
// // import * as classnames from 'classnames';
// import './Dummy.styl';
// const path = 'http://194.87.239.90/fabric/images/3D/mannequin';

// const canvas = window.document.createElement('canvas');
// canvas.setAttribute('width', '1600');
// canvas.setAttribute('height', '1600');
// canvas.setAttribute('style', 'position: absolute; top: 0; height: 100%');

// const canvasContext = canvas.getContext('2d');
// window.document.querySelector('body')!.appendChild(canvas);

// interface Cache {
//     [key: string]: HTMLImageElement;
// } 
// const cache: Cache = {};

// function draw(img: HTMLImageElement | null) {
//     if (img) {
//         canvasContext!.drawImage(img, 0, 0, 1600, 1600, 0, 0, 1600, 1600);
//     }
// }

// function _render(...args: (HTMLImageElement | null)[]) {
//     return () => {
//         args.forEach(a => draw(a));
//     };
// }

// type ImageType = {
//     garment: OrderItemInfo,
//     fabric: OrderItemInfo,
//     subgroup: string,
//     id: string,
// };
// type MakeImages = (
//     imageProperties: ImageType,
//     context: any, // tslint:disable-line
//     sourceCommon?: string) => (i: number, previewElement?: ActivePreviewElement ) => HTMLImageElement | null;
// const makeImages: MakeImages = (imageProperties, context, sourceCommon) => {
//     let {
//         garment,
//         fabric,
//         subgroup,
//         id,
//     } = imageProperties;
//     let loadingCount = 0;
//     const im = new Image();
//     const _sourceCommon = sourceCommon ? sourceCommon : `http://194.87.239.90/fabric/images/3D/` +
//     `${garment}/${fabric.our_code.replace(/(\.)(\/)/, '_')}/${subgroup}`; // ${id}/1600x1600/`;
//     if (context.constructor.loadedCache[_sourceCommon]) {
//         return (i, previewElement) => {
//             if (previewElement &&
//                 previewElement.garment === garment.our_code &&
//                 previewElement.group === 'fabric'
//                 // previewElement.subGroup === subgroup
//             ) {
//                 fabric.our_code = previewElement.value;
//             }
//             let source = sourceCommon ? sourceCommon : `http://194.87.239.90/fabric/images/3D/` +
//             `${garment}/${fabric.our_code.replace(/(\.)(\/)/, '_')}/${subgroup}`;
//             const _imageName = `${source}/${id ? (id + '/') : ''}1600x1600/${i}.png`;
//             if (!cache[_imageName]) {
//                 const _i = new Image;
//                 _i.src = _imageName;
//                 cache[_imageName] = _i;
//             }
//             return cache[_imageName];
//         };
//     }
//     const _images = (new Array(90)).fill(null);

//     context.state.loadingsCount =  context.loadingsCount + 1;
//     for (let i = 0; i < 90; i++) {
//         const img = new Image();
//         const src = `${_sourceCommon}/${id ? (id + '/') : ''}1600x1600/${i}.png`;
//         img.src = src;
//         img.onload = () => {
//             _images[i] = img;
//             loadingCount++;
//             context.setState({
//                 progress: loadingCount / 89 * 100,
//             });
//             if (loadingCount === 89) {
//                 context.constructor.loadedCache[_sourceCommon] = true;
//                 setTimeout(() => {
//                     context.setState({
//                         loadingsCount: context.loadingsCount - 1,
//                         progress: 0,
//                     });
//                 }, 100);
//             }
//         };
//         img.onerror = () => {
//             loadingCount++;
//             context.setState({
//                 progress: loadingCount / 89 * 100,
//             });        
//             if (loadingCount === 89) {
//                 context.setState({
//                     loadingsCount: context.loadingsCount - 1,
//                     progress: 0,
//                 });
//             }
//         };
//     }
//     return (i, previewElement) => {
//         if (previewElement &&
//             previewElement.garment === garment.our_code &&
//             previewElement.group === 'fabric'
//             // previewElement.subGroup === subgroup
//         ) {
//             fabric.our_code = previewElement.value;
//             let source = sourceCommon ? sourceCommon : `http://194.87.239.90/fabric/images/3D/` +
//             `${garment}/${fabric.our_code.replace(/(\.)(\/)/, '_')}/${subgroup}`;
//             im.src = `${source}/${id ? (id + '/') : ''}1600x1600/${i}.png`;
//             return im;
//             // return `${source}/${id ? (id + '/') : ''}1600x1600/${i}.png`;
//         }
//         return _images[i] ? _images[i] : null;
//     };
// };
// type imagesFunction = (i: number, previewElement: ActivePreviewElement) => HTMLImageElement | null 
// class Dummy extends React.Component<P, S> {
//     static loadedCache: object;
//     // private ref: HTMLDivElement;
//     dummyImages: imagesFunction = () => null;
//     shirtImages: imagesFunction = () => null;
//     trousersImages: imagesFunction = () => null;
//     jacketImages: imagesFunction = () => null;
    
//     constructor(props: P) {
//         super(props);
//         this.state = {
//             loadingsCount: 0,
//             progress: 0,
//         };
//     }
//     get loadingsCount() {
//         return this.state.loadingsCount;
//     }
//     componentDidMount() {
//         this.dummyImages = makeImages({} as ImageType, this, path);
//         // this.ref.appendChild(canvas);
//     }

//     componentWillReceiveProps(nextProps: P) {
//         const {
//             order,
//         } = nextProps;
//         canvasContext!.clearRect(0, 0, 1600, 1600);
//         if (order !== this.props.order) {
//             const _default = {
//                 garment: '',
//                 fabric: '',
//                 subgroup: '',
//                 id: '',
//             };
//             let shirt;        
//             try {
//                 shirt = {
//                     garment: {
//                         our_code: 'shirt',
//                         title:  'shirt'
//                     },
//                     fabric: {
//                         our_code: order!.shirt[0].fabric_ref.fabric,
//                         title:  order!.shirt[0].fabric_ref.fabric
//                     },
//                     subgroup: 'collars',
//                     id: order!.shirt[0].design.collars,
//                 };
//             } catch (_) {
//                 shirt = _default;
//             }
//             let trousers;
//             try {
//                 trousers = {
//                     garment: 'trousers',
//                     fabric: order!.trousers[0].fabric_ref.fabric,
//                     subgroup: 'model',
//                     id: order!.trousers[0].design.model,
//                 };
//             } catch (_) {
//                 trousers = _default;
//             }
//             let jacket;
//             try {
//                 jacket = {
//                     garment: 'jacket',
//                     fabric: order!.jacket[0].fabric_ref.fabric,
//                     subgroup: 'model',
//                     id: order!.jacket[0].design.model,
//                 };
//             } catch (_) {
//                 jacket = _default;
//             }
            
//             this.shirtImages = makeImages(shirt, this);
//             this.trousersImages = makeImages(trousers, this);
//             this.jacketImages = makeImages(jacket, this);            
//         }
//     }
//     render() {
//         const {
//             img,
//             imageYOffset,
//             scaleCoefficient,
//             onMouseLeave,
//             onMouseMove,
//             onMouseUp,
//             onMouseDown,
//             onWheelCapture,
//         } = this.props;
//         const pre = this.props.orderStore!.previewElement;
//         webkitRequestAnimationFrame(_render(
//             this.dummyImages(img, pre),
//             this.shirtImages(img, pre),
//             this.trousersImages(img, pre),
//             this.jacketImages(img, pre)
//         ));
//         return (
//           <div
//               className="dummy"
//               onMouseLeave={onMouseLeave}
//               onMouseMove={onMouseMove}
//               onMouseUp={onMouseUp}
//               onMouseDown={onMouseDown}
//               onWheelCapture={onWheelCapture}
//             //   ref={(ref) => { this.ref = ref as HTMLDivElement; }}
//               style={{
//                   position: 'relaive' as 'relative',
//                   transformOrigin: `50% ${imageYOffset}px`,
//                   transform: `scale(${scaleCoefficient}) `
//               }}
//           >
//           {/* {Dummy.shirts}
//           {Dummy.jackets}
//           {Dummy.trousers} */}
          
//             {/* <img
//                 className="preview__dummy-img dummy__img-active"
//                 src={`http://194.87.239.90/fabric/images/3D/mannequin/1600x1600/${img}.png`}
//             /> */}
// {/* 
//             <img className="preview__dummy-img dummy__img-active" src={this.dummyImages(img, pre)} />
//             <img className="preview__dummy-img dummy__img-active" src={this.shirtImages(img, pre)} />
//             <img className="preview__dummy-img dummy__img-active" src={this.trousersImages(img, pre)} />
//             <img className="preview__dummy-img dummy__img-active" src={this.jacketImages(img, pre)} /> */}

//             {
//                 !!this.state.loadingsCount &&
//                 <div
//                     className="preloader"
//                     style={{
//                         background: 'rgba(0,0,0, .2)',
//                         width: '50%',
//                         zIndex: 999999999,
//                     }}
//                 >
//                 <div className="preloader__progbar">
//                     <div className="preloader__progline" style={{ width: `${this.state.progress}%`}}/>
//                 </div>
//                 </div>
//             }
//           </div>
//         );
//       }
// }
// Dummy.loadedCache = {};

// export {
//     Dummy,
// };
 