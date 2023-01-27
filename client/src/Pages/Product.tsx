import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IMilk } from "../../../type";
import milkImg from '../images/milk.png';

const Product = () => {
  const [rangeValue, setRangeValue] = useState<number>(1);
  const [milk, setMilk] = useState<IMilk>({} as IMilk);
  let id: string | null = null;
  const url = window.location.pathname;
  const regex = /\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i;
  const match = url.match(regex);
  match && (id = match[1]);

  useEffect(() => {
    fetch(`/api/milk/${id}`)
      .then(res => res.json())
      .then(res => setMilk(res))
      .catch(err => console.error(err))
  }, []);

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => setRangeValue(Number(event.currentTarget.value));

  const makeOrder = () => {
    fetch(`/api/milk/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        quantity: rangeValue,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    alert('Order Submitted successfully');
    setMilk(prev => ({ ...prev, storage: milk.storage - rangeValue }))
    setRangeValue(1);
  };

  return (
    <section className="flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5x mt-32" >
        <div>
          <Link to={'/'} >{'< Back'}</Link>
          <img src={milkImg} alt='milk' className='h-72 p-10 my-32 bg-[#f6f6f6] rounded-2xl' />
        </div>
        <div className="flex-col pt-6 my-32">
          <h1 className="font font-bold tracking-tight text-black pt-2">{milk.name}</h1>
          <p className="mt-4 text-[#2E4057]">{milk.type}</p>
          <p className={`mt-4 ${milk.storage > 10 ? 'text-green-500' : 'text-red-500'}`}>{milk.storage} liter</p>

          <div className="flex flex-col items-center">
            <input
              type="range"
              className="mt-5 w-full h-6 p-0 focus:outline-none focus:ring-0 accent-[#00fc07]"
              min="range"
              max={milk.storage}
              step="1"
              defaultValue={rangeValue}
              id="rangeSelect"
              onChange={e => handleAmountChange(e)}
              data-testid="rangeSelect"
            />
            <p className="mt-2 text-base bg-white px-4 py-2 rounded w-24 text-center" data-testid='quantityOrder'> {rangeValue} liter</p>
          </div>
          <button className="rounded px-24 py-4 mt-7 bg-gray-300 hover:bg-gray-400 mb-5" onClick={makeOrder}>Order</button>
        </div>
      </div>
    </section >
  )
}

export default Product