import { useState } from 'react'
import goPediaLogo from './assets/GoPedia.png'

function App() {
  const [algorithm, setAlgorithm] = useState(false)
  const [validWikiTitle1, setValidWikiTitle1] = useState()
  const [validWikiTitle2, setValidWikiTitle2] = useState()
  
  function handleSearchChange(searchTerm, id) {
    let wikiSuggester = document.querySelector("#wikiSuggester" + id)    
    wikiSuggester.classList.remove("hidden")

    fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${searchTerm}&origin=*`)
    .then((res) => res.json())
    .then((json) => {
      let wikiEl = json[1].map((title) => <li onClick={() => changeSearch(title, id)} className='bg-white hover:bg-green-500 hover:text-white w-full hover:cursor-pointer' key={title}>{title}</li>)
      if (id == 1) setValidWikiTitle1(wikiEl);
      else setValidWikiTitle2(wikiEl);
    })
  }

  function hideWikiSuggest(id){
    let wikiSuggester = document.querySelector("#wikiSuggester" + id)
    wikiSuggester.classList.add("hidden")
  }

  function changeSearch(title, id){
    hideWikiSuggest(id)
    let currentSearchBar = document.querySelector("#search" + id)
    currentSearchBar.value = title
  }

  return (
    <>
      {/*Logo*/}
      <div className='flex items-center justify-center'>
        <img src={goPediaLogo} className="" alt="GoPedia logo" />
      </div>

      {/*Title*/}
      <h1 className="text-4xl flex items-center justify-center mb-10 font-bold"><bdi className='text-green-600'>Go</bdi>Pedia</h1>

      {/*Inputs*/}
      <form className="flex flex-col space-y-5 items-center" action={algorithm? "IDS" : "BFS"
      }>

        {/*Algortihm Switch*/}
        <div className="flex rounded p-1 text-white mb-1">  
          <p className="text-gray-600 font-semibold text-lg">BFS</p>
          <label className="mx-4 relative inline-flex items-center cursor-pointer">
            <input type="checkbox" onChange={() => setAlgorithm((!algorithm))} className="sr-only peer" id="ColorTextureToggle" ></input>
            <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full 
            peer-checked:after:border-white after:content-[''] after:absolute after:top-[0.2rem] after:left-[2px] 
            after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
            after:transition-all peer-checked:bg-green-500"></div>
          </label>
          <p className="text-green-500 font-semibold text-lg">IDS</p>
        </div>

        {/*Wikipedia Searchbox*/}
        <div className='flex flex-row space-x-12 text-lg'>
          <div className='flex flex-col'>
            <label htmlFor="source" className='text-xl  mb-2'>Web Wikipedia 1:</label>
            <input className=' bg-gray-200 appearance-none border-2 border-green-400 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white'
            type="text" id="search1" name="source" required minLength="1" maxLength="40" size="10" onKeyUp={(event) => handleSearchChange(event.target.value, 1)} />
            <ul id = "wikiSuggester1" className="mb-5 w-full border-2 border-green-400 hidden">
              {validWikiTitle1}
            </ul>
          </div>

          <div className='mt-6 text-2xl'>
            <p>
              ke
            </p>
          </div>
      
          <div className='flex flex-col'>
            <label htmlFor="end" className='text-xl mb-2'>Web Wikipedia 2:</label>
            <input className='bg-gray-200 appearance-none border-2 border-green-400 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white'
            type="text" id="search2" name="end" required minLength="1" maxLength="40" size="10" onKeyUp={(event) => handleSearchChange(event.target.value, 2)}/>
            <ul id = "wikiSuggester2" className="mb-5 w-full border-2 border-green-400 hidden">
              {validWikiTitle2}
            </ul>
          </div>
        </div>

        {/*Search Button*/}
        <div>
          <button className='text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-semibold rounded-lg px-8 py-3 text-lg mb-2 focus:outline-none'>
            Search!
          </button>
        </div>

      </form>


    </>
  )
}

export default App
