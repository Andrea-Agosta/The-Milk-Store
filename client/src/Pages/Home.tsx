import { useEffect, useState } from 'react'
import DropDown from '../components/Dropdown/Dropdown'
import { IMilk } from '../../../type'
import { Search } from 'react-bootstrap-icons';

const Home = () => {
  const [milkData, setMilkData] = useState<IMilk[]>([]);
  const [milkCategory, setMilkCategory] = useState<string[]>([]);

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

  return (
    <section className='bg-[#ffe3e1]'>
      <div className='flex justify-center'>
        <DropDown milkCategory={milkCategory} />
        <Search />
      </div>
    </section>
  )
}

export default Home