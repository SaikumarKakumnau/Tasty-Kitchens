import React from 'react'

const KitchenContext = React.createContext({
  cartData: [],
  activeTheme: 'light',
  changeTheme: () => {},
})

export default KitchenContext
