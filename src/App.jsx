import { useState } from 'react'
import goPediaLogo from './assets/GoPedia.png'

function App() {
  const [algorithm, setAlgorithm] = useState(false)


  const [validWikiTitle, setValidWikiTitle] = useState()
  function handleSearchChange(searchTerm) {
    fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${searchTerm}&origin=*`)
    .then((res) => res.json())
    .then((json) => {
      setValidWikiTitle(json[1].map((title) => <li key={title}><button className='bg-white hover:bg-green-500 hover:text-white w-full'>{title}</button></li>));
    })
    
  }

  return (
    <>
      {/*Logo*/}
      <div className='flex items-center justify-center'>
        <img src={goPediaLogo} className="" alt="GoPedia logo" />
      </div>

      {/*Title*/}
      <h1 className="text-4xl flex items-center justify-center mb-10 font-bold"><bdi className='text-green-600'>Go</bdi>Pedia</h1>

      {/*Input*/}
      <div className="flex flex-col space-y-5 items-center">

        {/*Algortihm Switch*/}
        <div className="flex rounded p-1 text-white mb-1">  
          <p className="text-gray-600 font-semibold ">BFS</p>
          <label className="mx-4 relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={algorithm} onChange={() => setAlgorithm((!algorithm))} className="sr-only peer" id="ColorTextureToggle" ></input>
            <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full 
            peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
            after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
            after:transition-all peer-checked:bg-green-500"></div>
          </label>
          <p className="text-green-500 font-semibold">IDS</p>
        </div>

        {/*Wikipedia Searchbox*/}
        <form>
          <label htmlFor="search1">Web Wikipedia 1:</label>
          <input className='mb-5 bg-gray-200 appearance-none border-2 border-green-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white'
          type="text" id="search1" name="search1" required minLength="1" maxLength="40" size="10" onChange={(event) => handleSearchChange(event.target.value)} />

          <ul className="mb-5 w-full border-2 border-green-400">
            {validWikiTitle}
          </ul>

          <label htmlFor="search2">Web Wikipedia 2:</label>
          <input className='bg-gray-200 appearance-none border-2 border-green-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white'
          type="text" id="search2" name="search2" required minLength="1" maxLength="40" size="10" onChange={(event) => handleSearchChange(event.target.value)}/>
        </form>
      </div>


    </>
  )
}

export default App
