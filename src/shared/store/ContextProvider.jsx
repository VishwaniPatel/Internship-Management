import React, { useState } from 'react'
import InternshipContext from './Context'
const InternshipProvider = ({children}) => {
    const [searchTerm, setSearchTerm] = useState ("");
  return (
   <InternshipContext.Provider value={{searchTerm,setSearchTerm}}>
    {children}
   </InternshipContext.Provider>
  )
}

export default InternshipProvider;