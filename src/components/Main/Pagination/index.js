import React from 'react'
import cx from 'classnames'

const PaginationItem = (props) => {

  let pageClass = cx({
    'page': true,
    'active': props.isActive
  })

  return <li className={pageClass}></li>

}

const Pagination = (props) => {

  let paginationClass = cx({
    'pagination-container': true,
    'pagination-left': props.position === 'left',
    'pagination-right': props.position === 'right'
  })

  return <div className={paginationClass}>
    <ul className="pagination">
      <PaginationItem />
      <PaginationItem isActive={true}/>
      <PaginationItem />
      <PaginationItem />
    </ul>
  </div>
}

export default Pagination