import { MouseEventHandler } from "react";
import { IPage } from "../../../../type";

interface IPagination {
  page: IPage;
  changePage: MouseEventHandler<HTMLButtonElement>;
}

const Pagination = ({ page, changePage }: IPagination) => {
  const buttonStyle = "hover:bg-gray-500 py-7 px-9 text-gray-500 cursor-pointer text-lg mr-5 border-2 border-gray-500 font-bold hover:text-black";
  return (
    <div className='flex justify-center pb-10'>
      <div className='flex justify-around my-5'>
        <button className={buttonStyle} name='prev' onClick={changePage}> {'<'} </button>
        <p className={buttonStyle + 'font-bold border-black text-black pointer-events-none'}> {page.current} </p>
        <p className='relative top-7 text-2xl text-gray-500 ml-10 mr-16 '>of</p>
        <button className={buttonStyle + 'font-bold border-black text-black'} name='last' onClick={changePage}> {page.last} </button>
        <button className={buttonStyle} name='next' onClick={changePage} > {'>'} </button>
      </div>
    </div >
  )
}

export default Pagination