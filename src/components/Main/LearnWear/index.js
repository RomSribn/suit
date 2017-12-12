import React from 'react'

const Controls = () => {
  return <div className={`controls controls--gray`}>
    <div className="circle left">
      {/*<img src='https://image.flaticon.com/icons/svg/17/17214.svg' alt=""/>*/}
      <span className="text">Где заказ?</span>
    </div>
    <div className="circle center">
      {/*<img src='https://png.icons8.com/metro/540/phone.png' alt=""/>*/}
      <span className="text">Звонок стилиста</span>
    </div>
    <div className="circle right">
      {/*<img src='http://icons.iconarchive.com/icons/icons8/ios7/512/Ecommerce-Shopping-Bag-icon.png' alt=""/>*/}
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
      <Controls />
    </div>
  </section>
}

export default LearnWear;