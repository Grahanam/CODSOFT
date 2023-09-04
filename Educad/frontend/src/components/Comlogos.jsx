import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'




const ComLogos=({brand,name})=>{

    return(
        <>
        <i className='flex flex-col items-center justify-center'>
            <FontAwesomeIcon className='text-2xl md:text-3xl lg:text-4xl' icon={brand}/>
            <i className='text-[8px] md:text-xs lg:text-xs'>{name}</i>
        </i>
        </>
    )

}

export default ComLogos