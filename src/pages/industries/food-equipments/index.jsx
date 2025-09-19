import React from 'react'
import FoodEquipments from '../../../container/Industries/food-equipments'
import CardGrid from '../../../container/Industries/food-equipments/cardSection'

const index = () => {
  return (
     <div
      className={`bg-[url(../../public/assets/images/RealSales-backgrounds/bg-15.png)] bg-center bg-repeat relative`}
    >
        <FoodEquipments/>
        <CardGrid/>
    </div>
  )
}

export default index