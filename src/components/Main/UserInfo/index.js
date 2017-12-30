import React, { Component } from 'react'

class UserInfo extends Component {
  render() {
    let userImage = 'https://pp.userapi.com/c840337/v840337301/3c1f7/F1sRUtxR5Hs.jpg'
    return <section className="user-info" style={{backgroundImage: `url(${userImage})`}}>
      <div className='user-info_container'>
        <h2 className='user-info_fullname'>Anatoliy Ivanov</h2>
        <address className='user-info__contacts'>
          <span className='user-info_email'>email@mail.com</span><br/>
          <span className='user-info_tel'>+7 (495) 234-12-34</span><br/>
          <span className="user-info_birth">24.03.1975</span>
        </address>
      </div>
    </section>
  }
}

export default UserInfo