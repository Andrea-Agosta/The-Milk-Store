import { ChangeEvent, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

interface IDropdown {
  milkCategory: string[];
  handleCheckboxChange(event: ChangeEvent<HTMLInputElement>): void;
}

export default function DropDown({ milkCategory, handleCheckboxChange }: IDropdown) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" data-testid='dropdown'>
          Filter
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {
              milkCategory.map((category: string, index: number) => (
                <Menu.Item key={index}>
                  <div className='row flex gap-2 p-2 '>
                    <div className='col-2'>
                      <input type="checkbox" name={category} data-testid={`checkbox${index}`} onChange={handleCheckboxChange} />
                    </div>
                    <div className='col-10'>
                      <label htmlFor="check">{category}</label>
                    </div>
                  </div>
                </Menu.Item>
              ))
            }
          </div>
        </Menu.Items>
      </Transition>
    </Menu >
  )
}