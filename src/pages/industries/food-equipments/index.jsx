import React from 'react'
import FoodEquipments from '../../../container/Industries/food-equipments'
import CardGrid from '../../../container/Industries/food-equipments/cardSection'

const index = () => {
  return (
     <div
      className={`relative`}
    >
        <FoodEquipments/>
        <CardGrid/>
    </div>
  )
}

export default index