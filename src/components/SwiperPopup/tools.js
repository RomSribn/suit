import React from 'react';
import { SwiperSlide } from 'swiper/react';
import { API_ROOT } from '../../config/routes';

export const urlNormilizer3000 = (localUrl) =>
  API_ROOT + localUrl.replace('/html', '');

export const createPackOfSlides = (imagesArray) => {
  const pack = [];

  for (let i = 0; i < imagesArray.length; i++) {
    pack.push(
      <SwiperSlide style={{ border: 'none' }} key={`Slide-num-${i}`}>
        <img
          className="swiper-image__slide"
          src={urlNormilizer3000(imagesArray[i])}
          alt={`Slide-num-${i}`}
        />
      </SwiperSlide>
    );
  }

  return pack;
};

export const createPackOfThumbs = (imagesArray) => {
  const pack = [];

  for (let i = 0; i < imagesArray.length; i++) {
    pack.push(
      <SwiperSlide key={`Thumb-num-${i}`}>
        <img
          className="swiper-image__thumb"
          src={urlNormilizer3000(imagesArray[i])}
          alt={`Slide-num-${i}`}
        />
      </SwiperSlide>
    );
  }

  return pack;
};
