import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { useBlog } from '../../context/BlogContext';
import { RxCross2 } from "react-icons/rx";

const TopSearchBar = () => {
  const [postOption, setPostOption] = useState('for_you')
  const { blogCategory , setFilterByCategory, filterByCategory, setSearchedData, searchedData} = useBlog()


  const handleSelectChange = (e) => {
    setFilterByCategory(e.target.value);
  };

  const handleSearch = (e)=>{
    setSearchedData(e.target.value)

  }

  console.log(blogCategory)
  return (
    <>
      <div className='w-full flex flex-col justify-center items-center  bg-gray-0  dark:bg-neutral-900 rounded-2xl ml-10 mt-2 mb-1'>
        <div className=' grid grid-cols-12 w-3/4 px-10 mt-5 gap-4 '>
          <div className='col-span-8'>
            <p className=' font-semibold text-md text-neutral-900/90 dark:text-gray-200 mb-1 px-1'>Search for posts</p>
            <div className="relative mb-5 ">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <FaSearch className='text-gray-600 dark:text-gray-400 text-lg' />
              </div>

              <div className={`${searchedData?'':'hidden'} absolute inset-y-0 end-2 flex items-center ps-3.5 `}>
                <RxCross2  className='text-gray-600 dark:text-gray-400 text-xl  hover:scale-105 cursor-pointer' onClick={()=>setSearchedData("")} />
              </div>
              <input value={searchedData} type="text" id="input-group-1" className="bg-gray-50 border border-gray-400 focus:outline-none text-gray-900 text-md rounded-2xl px-5 pr-8  block w-full ps-10 p-2 dark:bg-neutral-800/90 dark:border-neutral-600 dark:placeholder-neutral-500 dark:text-white  placeholder:font-semibold" placeholder="Search" 
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className='col-span-4'>
            <form className="max-w-sm mx-auto">
              <label for="countries" className="block  text-md font-semibold text-neutral-900/90 dark:text-gray-200 mb-1 px-1">Category</label>
              <select id="countries" className="bg-gray-50 border border-gray-400  font-semibold focus:outline-none text-gray-900 text-md rounded-2xl block w-full p-2 dark:bg-neutral-800/90 dark:border-neutral-600 dark:placeholder-gray-400 dark:text-white "
                value={filterByCategory}
                onChange={handleSelectChange}
              >
                <option value="" selected>All</option>

                {blogCategory && blogCategory?.map((category) => (
                  <option key={category.slug} className=' font-medium p-5' id={category.slug} value={category.category.toLowerCase()}>{category.category}</option>
                ))}
              </select>
            </form>
          </div>

        </div>
        <div className='flex gap-3 mb-3'>
          <div>
            <button className={`text-sm border-2 border-gray-400 dark:text-gray-300  px-2 py-[3px] rounded-full font-semibold transition-transform hover:scale-105 duration-500 ${postOption === 'for_you' ? 'bg-neutral-800 text-white dark:bg-gray-300 dark:text-gray-800' : 'hover:bg-gray-200 dark:hover:bg-neutral-700'} `} onClick={() => { setPostOption('for_you') }}>For you</button>
          </div>

          <div>
            <button className={`text-sm  border-2 border-gray-400 dark:text-gray-300  px-2 py-[3px] rounded-full font-semibold transition-transform hover:scale-105 duration-500 ${postOption === 'following' ? 'bg-neutral-800 text-white dark:bg-gray-300 dark:text-gray-800' : 'hover:bg-gray-200 dark:hover:bg-neutral-700'}`} onClick={() => { setPostOption('following') }}>Following</button>
          </div>

          <div>
            <button className={` text-sm  border-2 border-gray-400 dark:text-gray-300  px-2 py-[3px] rounded-full font-semibold transition-transform hover:scale-105 duration-500 ${postOption === 'popular' ? 'bg-neutral-800 text-white dark:bg-gray-300 dark:text-gray-800' : 'hover:bg-gray-200 dark:hover:bg-neutral-700 '} `} onClick={() => { setPostOption('popular') }}>Popular</button>
          </div>

        </div>
      </div>
    </>
  )
}

export default TopSearchBar