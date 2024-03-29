import * as React from 'react';
import { Swiper } from 'swiper/react';
import SwiperCore, { Pagination, Thumbs } from 'swiper';
import 'swiper/swiper-bundle.css';
import './styles.css';
import { createPackOfSlides, createPackOfThumbs } from './tools';
import { Button } from '../Button';
import { loc } from './loc';
import { loc as MobileNavigationMenuPopupLoc } from '../MobileNavigationMenuPopup/loc';

SwiperCore.use([Pagination, Thumbs]);

const SwiperPopup = (props: SwiperPopupProps) => {
  const [thumbsSwiper, setThumbsSwiper] = React.useState();
  const { lang, currentActiveGarment } = props;
  const renderValue = ({ title, itemTitle }: RenderValue) => {
    const locValue =
      props.item &&
      props.item[itemTitle] &&
      props.item[itemTitle].title &&
      props.item[itemTitle].title[lang];
    const value =
      props.item &&
      props.item[itemTitle] &&
      props.item[itemTitle][`${itemTitle}Name`];
    return `${loc[lang][title]} ${locValue || value}`;
  };
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
              {props.item &&
                props.item.img_url_2d_list &&
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
              {props.item &&
                props.item.img_url_2d_list &&
                createPackOfThumbs(props.item.img_url_2d_list)}
            </Swiper>
          </div>
        </div>

        <div className="text-block__info">
          <div className="text-block__title">
            {props.item && props.item.title && props.item.title.ru}
            <div>
              ({props.item && props.item.title && props.item.elementCode})
            </div>
          </div>

          <div className="text-block__breadcrumbs">
            <a href="/">{loc[lang].order}</a>
            <span>/</span>
            <a onClick={props!.closeButton}>
              {MobileNavigationMenuPopupLoc[lang][currentActiveGarment]}
            </a>
            <span>/</span>
            <a onClick={props!.closeButton}>
              {props.item!.elementInfo!.group === 'fabric_ref'
                ? loc[lang].cloth
                : loc[lang].designLink}
            </a>
          </div>

          <div className="text-block__price">
            <span>{loc[lang].currency}</span>
            {props.item && props.item.price && props.item.price.title[lang]}
          </div>

          {/* Тут ваша импортированая кнопка */}
          <Button className="text-block__button" onClick={props!.closeButton}>
            {props.item!.elementInfo!.group === 'fabric_ref'
              ? loc[lang].clothSelected
              : loc[lang].designSelected}
          </Button>
          <h2>{loc[lang].productInfo}</h2>
          {props.item!.elementInfo!.group === 'fabric_ref' ? (
            <>
              <p>
                {renderValue({
                  title: 'manufacturer',
                  itemTitle: 'manufacturer',
                })}
              </p>
              <p>{props.item!.description![lang]}</p>
              <p>
                {renderValue({ title: 'fabricColor', itemTitle: 'main_color' })}
              </p>
              <p>{renderValue({ title: 'pattern', itemTitle: 'pattern' })}</p>
              <p>{renderValue({ title: 'weight', itemTitle: 'weight' })}</p>
              <p>{loc[lang].composition}</p>
              <p>{renderValue({ title: 'catalog', itemTitle: 'catalog' })}</p>
              <p>{loc[lang].clothLeft}</p>
            </>
          ) : (
            <p>{props.item!.description![lang]}</p>
          )}
        </div>
      </div>
      <div className="btn close-swiper-popup" onClick={props.closeButton} />
    </div>
  );
};

export { SwiperPopup };
