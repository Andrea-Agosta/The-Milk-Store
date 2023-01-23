import { useEffect, useState } from 'react'
import DropDown from '../components/Dropdown'
import { IMilk } from '../../../type'

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
      </div>
    </section>
  )
}

export default Home