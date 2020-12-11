import * as React from 'react';
import { Swiper } from 'swiper/react';
import SwiperCore, { Pagination, Thumbs } from 'swiper';
import 'swiper/swiper-bundle.css';
import './styles.css';
import { createPackOfSlides, createPackOfThumbs } from './tools';
import { Button } from '../Button';
import { loc } from './loc';

SwiperCore.use([Pagination, Thumbs]);

const SwiperPopup = (props: SwiperPopupProps) => {
  const [thumbsSwiper, setThumbsSwiper] = React.useState();
  const { lang } = props;

  return (
    <div className="swiper-popup-container">
      <div className="text-block">
        <div className={'text-block__top'}>
          <div className="swipe-block">
            <Swiper
                id="main"
                thumbs={{ swiper: thumbsSwiper! }}
                pagination={true}
                spaceBetween={0}
                slidesPerView={1}
            >
              {props.item && props.item.img_url_2d_list &&
              createPackOfSlides(props.item.img_url_2d_list)}
            </Swiper>

            <Swiper
                id="thumbs"
                style={{ width: 'auto', marginRight: '10px' }}
                direction="vertical"
                spaceBetween={5}
                slidesPerView={4}
                onSwiper={setThumbsSwiper!}
            >
              {props.item && props.item.img_url_2d_list &&
              createPackOfThumbs(props.item.img_url_2d_list)}
            </Swiper>
          </div>
          <div className="text-block__title">
            {props.item && props.item.title && props.item.title.ru}
            <div>({props.item && props.item.title && props.item.elementCode})</div>
          </div>

          <div className="text-block__breadcrumbs">
            <a href="/">{loc[lang].order}</a>
            <span>/</span>
            <a onClick={props!.closeButton}>{loc[lang].shirt}</a>
            <span>/</span>
            <a onClick={props!.closeButton}>
              { 
                props.item!.elementInfo!.group === 'fabric_ref'
                  ? loc[lang].cloth
                  : loc[lang].designLink 
              }
            </a>
          </div>

          <div className="text-block__price">
            <span>{loc[lang].currency}</span>
            {props.item && props.item.price && props.item.price.title[lang]}
          </div>

          {/* Тут ваша импортированая кнопка */}
          <Button className="text-block__button" onClick={props!.closeButton}>
            {props.item!.elementInfo!.group === 'fabric_ref' ? loc[lang].clothSelected : loc[lang].designSelected} 
          </Button>
        </div>

        <div className="text-block__info">
          <h2>{loc[lang].productInfo}</h2>
          {
            props.item!.elementInfo!.group === 'fabric_ref'
              ? <>
                <p>Brand: Andrezza & Castelli</p>
                <p>{props.item!.description![lang]}</p>
                <p>
                  {loc[lang].fabricColor}
                  {props.item && props.item.main_color && props!.item.main_color.title[lang]}
                </p>
                <p>{loc[lang].fabric} {props.item && props.item.pattern && props.item.pattern.title[lang]}</p>
                <p>{loc[lang].density}</p>
                <p>{loc[lang].composition}</p>
                <p>{loc[lang].catalog}</p>
                <p>{loc[lang].category}</p>
                <p>{loc[lang].design}</p>
                <p>{loc[lang].clothLeft}</p>
              </>
              : <p>{props.item!.description![lang]}</p>
          }
          
        </div>
      </div>
      <div
        className="btn close-swiper-popup"
        onClick={props.closeButton}
      />
    </div>
  );
};

export { SwiperPopup };
