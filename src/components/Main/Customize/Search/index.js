import React from 'react'
import { observer } from 'mobx-react'


const Search = observer(({group, ...props}) => {
  return <input
                value={group.search || ''}
                type="text"
                placeholder="Поиск"
                className="search-input"
                onChange={e => group.searchField = e.target.value}/>
})

export default Search
