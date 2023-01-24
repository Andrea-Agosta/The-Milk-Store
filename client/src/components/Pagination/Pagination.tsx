import React from 'react'

const Pagination = () => {
  const buttonStyle = "hover:bg-gray-500 py-7 px-9 text-gray-500 cursor-pointer text-lg mr-5 border-2 border-gray-500 font-bold hover:text-black";
  return (
    <div className='flex justify-center'>
      <div className='flex justify-around my-5'>
        <button className={buttonStyle}> {'<'} </button>
        <button className={buttonStyle + 'font-bold border-black text-black'}> 1 </button>
        <p className='relative top-7 text-2xl text-gray-500 ml-10 mr-16 '>of</p>
        <button className={buttonStyle + 'font-bold border-black text-black'}> 11 </button>
        <button className={buttonStyle}> {'>'} </button>
      </div>
    </div >
  )
}

export default Pagination