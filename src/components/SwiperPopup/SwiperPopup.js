import React, { useState } from 'react';
import { Swiper } from 'swiper/react';
import SwiperCore, { Pagination, Thumbs } from 'swiper';
import 'swiper/swiper-bundle.css';
import './styles.css';
import { createPackOfSlides, createPackOfThumbs } from './tools';
import { Button } from '../Button';
import { toJS } from 'mobx';

SwiperCore.use([Pagination, Thumbs]);

const SwiperPopup = (props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="swiper-popup-container">
      <div className="swipe-block">
        <Swiper
          id="main"
          thumbs={{ swiper: thumbsSwiper }}
          pagination
          spaceBetween={0}
          slidesPerView={1}
        >
          {props.item.img_url_2d_list &&
            createPackOfSlides(toJS(props.item.img_url_2d_list))}
        </Swiper>

        <Swiper
          id="thumbs"
          style={{ width: 'auto', marginRight: '10px' }}
          direction="vertical"
          spaceBetween={5}
          slidesPerView={4}
          onSwiper={setThumbsSwiper}
        >
          {props.item.img_url_2d_list &&
            createPackOfThumbs(toJS(props.item.img_url_2d_list))}
        </Swiper>
      </div>

      <div className="text-block">
        <div className="text-block__title">
          {props.item.title && props.item.title.ru}
          <div>({props.item.title && props.item.elementCode})</div>
        </div>
        <div className="text-block__breadcrumbs">
          <a href="/">Заказать</a>
          <span>/</span>
          <a onClick={props.closeButton}>Сорочка</a>
          <span>/</span>
          <a onClick={props.closeButton}>Ткань</a>
        </div>
        <div className="text-block__price">
          <span>₽</span>
          {props.item.price && props.item.price.title.ru}
        </div>

        {/* Тут ваша импортированая кнопка */}
        <Button className="text-block__button" onClick={props.closeButton}>
          Ткань выбрана
        </Button>

        <div className="text-block__info">
          <h2>Информация о товаре</h2>
          <p>Brand: Andrezza & Castelli</p>
          <p>
            Цвет ткани:
            {props.item.main_color && props.item.main_color.title.ru}
          </p>
          <p>Рисунок: {props.item.pattern && props.item.pattern.title.ru}</p>
          <p>Плотность: 120-140</p>
          <p>Состав: Хлопок</p>
          <p>Каталог: CLASSIC A-1</p>
          <p>Категория: 40-50s Classic</p>
          <p>Конструкция: 50</p>
          <p>Осталось ткани: 22 м</p>
        </div>
      </div>
      <div
        className="btn gallery__filter-btn close-swiper-popup"
        onClick={props.closeButton}
      ></div>
    </div>
  );
};

export { SwiperPopup };
