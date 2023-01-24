import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import DropDown from '../components/Dropdown/Dropdown'
import { IMilk } from '../../../type'
import Search from '../components/Search/Search';

const Home = () => {
  const [milkData, setMilkData] = useState<IMilk[]>([]);
  const [milkCategory, setMilkCategory] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetch('./api/milk')
      .then(res => res.json())
      .then(res => {
        setMilkData(res.results);
        const categoriesList = res.results.reduce((container: string[], item: IMilk) => container.includes(item.type) ? container : [...container, item.type], []);
        setMilkCategory(categoriesList);
      })
      .catch(err => console.error(err))
  }, []);

  const handleSearchInputChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  }

  const callSearchFunction = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    //function for searching
  }

  return (
    <section className='bg-[#ffe3e1]'>
      <div className='flex justify-around'>
        <Search handleSearchInputChanges={handleSearchInputChanges} callSearchFunction={callSearchFunction} />
        <DropDown milkCategory={milkCategory} />
      </div>
    </section>
  )
}

export default Home