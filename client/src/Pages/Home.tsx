import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import DropDown from '../components/Dropdown/Dropdown'
import { IMilk } from '../../../type'
import Search from '../components/Search/Search';
import Card from '../components/Card/Card';

const Home = () => {
  const [milkData, setMilkData] = useState<IMilk[]>([]);
  const [milkCategory, setMilkCategory] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [renderData, setRenderData] = useState<IMilk[]>([]);

  useEffect(() => {
    fetch('./api/milk')
      .then(res => res.json())
      .then(res => {
        setMilkData(res.results);
        setRenderData(res.results);
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
      <div className='py-28 flex justify-around'>
        <div className='flex-col'>
          <Search handleSearchInputChanges={handleSearchInputChanges} callSearchFunction={callSearchFunction} />
          <p className='mt-4 pl-1'> {milkData.length} products</p>
        </div>
        <DropDown milkCategory={milkCategory} />
      </div>
      <div className='grid grid-cols-1 gap-6'>
        {renderData.map(milk => <Card key={milk.id} milk={milk} />)}
      </div>
    </section>
  )
}

export default Home