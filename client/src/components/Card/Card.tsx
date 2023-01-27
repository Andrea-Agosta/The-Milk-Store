import { Link } from 'react-router-dom';
import { IMilk } from '../../../../type';
import milkImg from '../../images/milk.png';

interface ICard {
  milk: IMilk;
}

const Card = ({ milk }: ICard) => {
  return (
    <article className="flex flex-col drop-shadow-md max-w-sm">
      <Link to={`/milk/${milk.id}`} data-testid={'linkCard'} >
        <figure className="rounded-t-2xl flex justify-center bg-[#f6f6f6]" >
          <img
            src={milkImg}
            alt='milk'
            className='h-40 my-5'
          />
        </figure>
        <div className='p-5 bg-white rounded-b-2xl'>
          <h1 className="font font-bold tracking-tight text-black">{milk.name}</h1>
          <div className="flex justify-between">
            <p className="mt-4 text-[#2E4057]">{milk.type}</p>
            <p className={`mt-4 ${milk.storage > 10 ? 'text-green-500' : 'text-red-500'}`}>{milk.storage} liter</p>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default Card