import { ChangeEvent, FormEvent, MouseEventHandler, useEffect, useState } from 'react'
import DropDown from '../components/Dropdown/Dropdown'
import { IMilkRespone, IPage } from '../../../type'
import Search from '../components/Search/Search';
import Card from '../components/Card/Card';
import Pagination from '../components/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [milkData, setMilkData] = useState<IMilkRespone>();
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState<IPage>({} as IPage);
  const navigate = useNavigate();

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
    const urlParams = new URLSearchParams(window.location.search);
    const filter = urlParams.get('type');
    if (filter) {
      navigate(`?search=${searchValue}&type=${filter}&page=${page.current}`);
      fetch(`./api/milk?search=${searchValue}&type=${filter}&page=${page.current}`)
        .then(res => res.json())
        .then(res => {
          setMilkData(res);
          setPage({ current: 1, last: Math.ceil(res.numberOfItems / 9) })
        })
        .catch(err => console.error(err))
    } else {
      navigate(`?search=${searchValue}&page=${page.current}`);
      fetch(`./api/milk?search=${searchValue}&page=${page.current}`)
        .then(res => res.json())
        .then(res => {
          setMilkData(res);
          setPage({ current: 1, last: Math.ceil(res.numberOfItems / 9) })
        })
        .catch(err => console.error(err))
    }
  }

  const submitWithEnterKey = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      const urlParams = new URLSearchParams(window.location.search);
      const filter = urlParams.get('type');
      if (filter) {
        navigate(`?search=${searchValue}&type=${filter}&page=${page.current}`);
        fetch(`./api/milk?search=${searchValue}&type=${filter}&page=${page.current}`)
          .then(res => res.json())
          .then(res => {
            setMilkData(res);
            setPage({ current: 1, last: Math.ceil(res.numberOfItems / 9) })
          })
          .catch(err => console.error(err))
      } else {
        navigate(`?search=${searchValue}&page=${page.current}`);
        fetch(`./api/milk?search=${searchValue}&page=${page.current}`)
          .then(res => res.json())
          .then(res => {
            setMilkData(res);
            setPage({ current: 1, last: Math.ceil(res.numberOfItems / 9) })
          })
          .catch(err => console.error(err))
      }
    }
  };

  const changePage: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get('search');
    const filter = urlParams.get('type');
    const pageUrl = urlParams.get('page');
    let url = '';
    if (event.currentTarget.name === 'prev') {
      search && (url += `&search=${search}`);
      filter && (url += `&type=${filter}`);
      page && (url += `&page=${Number(pageUrl) - 1}`);
      fetch(`./api/milk?${url}`)
        .then(res => res.json())
        .then(res => {
          setMilkData(res);
          setPage({ current: page.current - 1, last: Math.ceil(res.numberOfItems / 9) })
        })
        .catch(err => console.error(err))
      navigate(`?${url}`);
    }

    if (event.currentTarget.name === 'next') {
      search && (url += `&search=${search}`);
      filter && (url += `&type=${filter.split(' ').join('%20')}`);
      page && (url += `&page=${Number(pageUrl) + 1}`);
      fetch(`./api/milk?${url}`)
        .then(res => res.json())
        .then(res => {
          setMilkData(res);
          setPage({ current: page.current + 1, last: Math.ceil(res.numberOfItems / 9) })
        })
        .catch(err => console.error(err))
      navigate(`?${url}`);
    }

    if (event.currentTarget.name === 'last') {
      search && (url += `&search=${search}`);
      filter && (url += `&type=${filter}`);
      page && (url += `&page=${page.last}`);
      fetch(`./api/milk?${page.last}`)
        .then(res => res.json())
        .then(res => {
          setMilkData(res);
          setPage({ current: page.last, last: Math.ceil(res.numberOfItems / 9) })
        })
        .catch(err => console.error(err))
      navigate(`?${url}`);
    }
  }

  const handleCheckboxChange = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get('search');
    if (search) {
      navigate(`?search=${search}&type=${event.currentTarget.name}&page=${page.current}`);
      fetch(`./api/milk?search=${search}&type=${event.currentTarget.name}&page=${page.current}`)
        .then(res => res.json())
        .then(res => {
          setMilkData(res);
          setPage({ current: 1, last: Math.ceil(res.numberOfItems / 9) })
        })
        .catch(err => console.error(err))
    } else {
      navigate(`?type=${event.currentTarget.name}&page=${page.current}`);
      fetch(`./api/milk?type=${event.currentTarget.name}&page=${page.current}`)
        .then(res => res.json())
        .then(res => {
          setMilkData(res);
          setPage({ current: 1, last: Math.ceil(res.numberOfItems / 9) })
        })
        .catch(err => console.error(err))
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

export default Home;