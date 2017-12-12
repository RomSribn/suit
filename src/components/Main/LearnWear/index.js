import React from 'react'

import LeftArrow from 'Assets/images/svg/left-arrow.svg'
import RightArrow from 'Assets/images/svg/right-arrow.svg'
import Save from 'Assets/images/svg/save.svg'

const Controls = () => {
  return <div className={`controls controls--gray`}>
    <div className="circle left">
      <img src={LeftArrow} alt=""/>
      <span className="text">Где заказ?</span>
    </div>
    <div className="circle center">
      <img src={Save} alt=""/>
      <span className="text">Сохранить</span>
    </div>
    <div className="circle right">
      <img src={RightArrow} alt=""/>
      <span className="text">В корзину</span>
    </div>
  </div>
}

const LearnWear = () => {
  return <section className="lw">
    <div className="lw-container">
      <h2 className="lw_heading">Размер воротника</h2>
      <div className="lw-content">
        <p className="lw-content_text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque dicta dignissimos
          distinctio doloribus ea
          exercitationem expedita laboriosam magni necessitatibus nihil tempora velit veritatis vero, voluptate
          voluptatem. Deserunt porro quis vel voluptate. Asperiores debitis facilis, fuga, iure, magnam neque omnis
          quasi
          quibusdam quis sapiente sed sequi soluta ullam vel voluptas voluptates voluptatibus.<br/><br/>At autem blanditiis,
          dicta
          doloremque eveniet ipsam iste minus molestiae natus neque nesciunt nulla odio officiis perferendis possimus,
          praesentium provident quibusdam quis, quod tempore voluptatum.</p>
        <video className="lw-content_video" controls preload="metadata">
          <source src="movie.mp4" type="video/mp4"/>
          <source src="movie.webm" type="video/webm"/>
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
    <Controls />
  </section>
}

export default LearnWear;