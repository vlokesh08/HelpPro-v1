import { Input } from './ui/input'

const SearchBox = () => {
  return (
    <div className="bg-white dark:bg-dark-box font-spacegotesk rounded-xl w-full p-5 flex border-none">
        <div className="w-full">
            <Input type="text" placeholder="Type to Search or Use the Global Search" className=" cursor-pointer"></Input>
        </div>
        <div className="flex h-auto justify-center items-center px-5">
            <p className="p-2 px-4 bg-gray-200 rounded-lg">Ctrl</p>
            <p className="p-2">+</p>
            <p className="p-2 px-4 bg-gray-200 rounded-lg">K</p>
        </div>
    </div>
  )
}

export default SearchBox