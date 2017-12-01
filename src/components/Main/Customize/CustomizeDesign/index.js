import React from 'react'
import CustomizeDesignListItem from "./CustomizeDesignListItem"

/// Пример использования компонента ///
//Пример массива данных, передаваемых в <CustomizeDesignListItem />
let demo_items = [
  "Name 1",
  "Name 2",
  "Name 3",
  "Name 4"
]

//Пример массива списков в <CustomizeDesign />
let demo_list = [
  {
    heading: 'Heading 1',
    demo_items
  },
  {
    heading: 'Heading 2',
    demo_items
  },
  {
    heading: 'Heading 3',
    demo_items
  },
]
/// Конец примера использования компонента ///

const CustomizeDesign = (props) => {
  return (
    <ul className="list">
      {
        // TODO demo_list заменить на props
        demo_list.map((item, key) => {
          return <CustomizeDesignListItem heading={item.heading} items={item.demo_items} key={key}/>
        })
      }
    </ul>
  )
}

export default CustomizeDesign