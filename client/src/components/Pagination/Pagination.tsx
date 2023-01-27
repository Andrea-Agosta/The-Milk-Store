import { MouseEventHandler } from "react";
import { IPage } from "../../../../type";

interface IPagination {
  page: IPage;
  changePage: MouseEventHandler<HTMLButtonElement>;
}

const Pagination = ({ page, changePage }: IPagination) => {
  const buttonStyle = "hover:bg-gray-500 py-7 px-9 text-black cursor-pointer text-lg mr-5 border-2 border-black font-bold hover:text-black font-bold";

  return page.current === page.last ?
    (
      <div className='flex justify-center pb-10'>
        <div className='flex justify-around my-5'>
          {
            page.current === 1 ? <button className={"py-7 px-9 text-gray-500 text-lg mr-5 border-2 border-gray-500 font-bold"} name='prev' disabled> {'<'} </button>
              : <button className={buttonStyle} name='prev' onClick={changePage}> {'<'} </button>
          }
          <p className={buttonStyle + 'pointer-events-none'}> {page.current} </p>
          <p className='relative top-7 text-2xl text-gray-500 ml-10 mr-16 '>of</p>
          <button className="py-7 px-9 text-gray-500 text-lg mr-5 border-2 border-gray-500 font-bold" name='last' disabled> {page.last} </button>
          <button className={"py-7 px-9 text-gray-500 text-lg mr-5 border-2 border-gray-500 font-bold pointer-events-none"} name='next' > {'>'} </button>
        </div>
      </div >
    )
    :
    (
      <div className='flex justify-center pb-10'>
        <div className='flex justify-around my-5'>
          {
            page.current === 1 ? <button className={"py-7 px-9 text-gray-500 text-lg mr-5 border-2 border-gray-500 font-bold"} name='prev' disabled> {'<'} </button>
              : <button className={buttonStyle} name='prev' onClick={changePage}> {'<'} </button>
          }
          <p className={buttonStyle + 'pointer-events-none'}> {page.current} </p>
          <p className='relative top-7 text-2xl text-gray-500 ml-10 mr-16 '>of</p>
          <button className={buttonStyle} name='last' onClick={changePage}> {page.last} </button>
          <button className={buttonStyle} name='next' onClick={changePage} > {'>'} </button>
        </div>
      </div >
    )
}

export default Pagination