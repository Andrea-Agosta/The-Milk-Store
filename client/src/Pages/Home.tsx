import { ChangeEvent, FormEvent, MouseEventHandler, useEffect, useState } from 'react'
import DropDown from '../components/Dropdown/Dropdown'
import { IMilkRespone, IPage } from '../../../type'
import Search from '../components/Search/Search';
import Card from '../components/Card/Card';
import Pagination from '../components/Pagination/Pagination';

const Home = () => {
  const [milkData, setMilkData] = useState<IMilkRespone>();
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState<IPage>({} as IPage);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    fetch('./api/milk')
      .then(res => res.json())
      .then(res => {
        setMilkData(res);
        setPage({ current: 1, last: Math.ceil(res.numberOfItems / 9) })
      })
      .catch(err => console.error(err))
  }, []);

  const handleSearchInputChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  }

  const callSearchFunction = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    fetch(`./api/milk/search?search=${searchValue}&page=${page.current}`)
      .then(res => res.json())
      .then(res => {
        setMilkData(res);
        setPage({ current: 1, last: Math.ceil(res.numberOfItems / 9) })
      })
      .catch(err => console.error(err))
  }

  const changePage: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    if (event.currentTarget.name === 'prev') {
      fetch(`./api/milk/filter?page=${page.current - 1}`)
        .then(res => res.json())
        .then(res => {
          setMilkData(res);
          setPage({ current: page.current - 1, last: Math.ceil(res.numberOfItems / 9) })
        })
        .catch(err => console.error(err))
    }

    if (event.currentTarget.name === 'next') {
      fetch(`./api/milk/filter?page=${page.current + 1}`)
        .then(res => res.json())
        .then(res => {
          setMilkData(res);
          setPage({ current: page.current + 1, last: Math.ceil(res.numberOfItems / 9) })
        })
        .catch(err => console.error(err))
    }

    if (event.currentTarget.name === 'last') {
      fetch(`./api/milk/filter?page=${page.last}`)
        .then(res => res.json())
        .then(res => {
          setMilkData(res);
          setPage({ current: page.last, last: Math.ceil(res.numberOfItems / 9) })
        })
        .catch(err => console.error(err))
    }
  }

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (isChecked) {
      fetch('./api/milk/filter')
        .then(res => res.json())
        .then(res => {
          setMilkData(res);
          setPage({ current: 1, last: Math.ceil(res.numberOfItems / 9) })
        })
        .catch(err => console.error(err))
    }
  };

  const submitWithEnterKey = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      fetch(`./api/milk/search?search=${searchValue}&page=${page.current}`)
        .then(res => res.json())
        .then(res => {
          setMilkData(res);
          setPage({ current: 1, last: Math.ceil(res.numberOfItems / 9) })
        })
        .catch(err => console.error(err));
      (event.currentTarget as HTMLInputElement).value = '';
    }
  };

  return (
    <section>
      <div className='pt-28 pb-10 flex justify-around'>
        <div className='flex-col mr-60'>
          <Search handleSearchInputChanges={handleSearchInputChanges} callSearchFunction={callSearchFunction} submitWithEnterKey={submitWithEnterKey} />
          <p className='mt-4 pl-1'> {milkData ? milkData.numberOfItems : ''} products</p>
        </div>
        <DropDown milkCategory={milkData ? milkData.types : []} handleCheckboxChange={handleCheckboxChange} />
      </div>
      <div className='flex justify-center mb-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 max-w-5xl'>
          {milkData ? milkData?.data.map(milk => <Card key={milk.id} milk={milk} />) : ''}
          {milkData?.data.length === 0 && <a href='/' className=''> {'< Back'}</a>}
        </div>
      </div>
      <Pagination page={page} changePage={changePage} />
    </section>
  )
}

export default Home