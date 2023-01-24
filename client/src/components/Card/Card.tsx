import { Link } from 'react-router-dom';
import { IMilk } from '../../../../type';
import milkImg from '../../images/milk.png';

interface ICard {
  milk: IMilk;
}

const Card = ({ milk }: ICard) => {
  return (
    <article className="flex flex-col border-2 rounded-2xl p-5 drop-shadow-md bg-[#EFF1F3] max-w-sm">
      <Link to={`/milk/${milk.id}`}>
        <figure className="overflow-hidden rounded-lg flex justify-center" >
          <img
            src={milkImg}
            alt='milk'
            className='h-40'
          />
        </figure>
        <h1 className="mt-5 font text-2xl font-bold tracking-tight text-[#2F2D2E]">{milk.name}</h1>
        <div className="flex justify-between">
          <p className="mt-4 text-xl text-[#2E4057]">{milk.type}</p>
          <p className={`mt-4 text-xl ${milk.storage > 10 ? 'text-green-500' : 'text-red-500'}`}>{milk.storage} liter</p>
        </div>
      </Link>
    </article>
  )
}

export default Card