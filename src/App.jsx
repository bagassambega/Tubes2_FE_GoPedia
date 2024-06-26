import { useState } from 'react'
import goPediaLogo from './assets/GoPedia.png'
import { Background } from './Background'
import MoonLoader from "react-spinners/MoonLoader";

function Main() {
  const [validWikiTitle1, setValidWikiTitle1] = useState()
  const [validWikiTitle2, setValidWikiTitle2] = useState()
  const [wikiPath, setwikiPath] = useState()
  const [loading, setLoading] = useState(false);
  const [outputHeader, setOutputHeader] = useState();


  async function handleWikiSubmit(e){
    e.preventDefault();
    let output = document.querySelector("#output")
    output.classList.add("hidden")

    hideWikiSuggest(1)
    hideWikiSuggest(2)

    setLoading(true)

    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());

    let method = formJson.methodToggle? "IDS" : "BFS"
    let source = await redirectSearch(formJson.source.split(` `).join(`+`))
    let target = await redirectSearch(formJson.target.split(` `).join(`+`))
    source = source.split(` `).join(`_`)
    target = target.split(` `).join(`_`)

    const sourceValidation = await fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${source}&origin=*`)
    const sourceValidationJson = await sourceValidation.json()

    const targetValidation = await fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${target}&origin=*`)
    const targetValidationJson = await targetValidation.json()

    let thread = null;

    
    if (!sourceValidationJson[1].length){
      setOutputHeader(<p className='text-2xl mb-5 text-center'><bdi className='font-semibold'>Error:</bdi> Web Wikipedia 1 &quot;<bdi className='font-semibold'>{source}</bdi>&quot; Tidak ditemukan. </p>)
      output.classList.remove("bg-green-100", "border-green-600")
      output.classList.add("bg-red-100", "border-red-600")
    }
    else if (!targetValidationJson[1].length){
      setOutputHeader(<p className='text-2xl mb-5 text-center'><bdi className='font-semibold'>Error:</bdi> Web Wikipedia 2 &quot;<bdi className='font-semibold'>{target}</bdi>&quot; Tidak ditemukan. </p>)
      output.classList.remove("bg-green-100", "border-green-600")
      output.classList.add("bg-red-100", "border-red-600")
    }
    else{
      output.classList.remove("bg-red-100", "border-red-600")
      output.classList.add("bg-green-100", "border-green-600")
      
      const res = await fetch(`http://localhost:8080/gopedia/?method=${method}&source=${source}&target=${target}`)
      const json = await res.json()
  
      thread = json.result.map(
        (el) => <a key={el} href={el} className='p-1 hover:bg-green-500 border-green-500 border-2' target="_blank">{el.slice(24)}</a>
      )

      setOutputHeader(<p className='text-2xl mb-5 text-center'>Ditemukan jalur dengan menulusuri <bdi className='font-semibold'>{json.numOfArticles}</bdi> artikel 
      sepanjang <bdi className='font-semibold'>{json.length}</bdi> jalur 
      dalam waktu <bdi className='font-semibold'>{json.elapsedTime}</bdi>!
      </p>)
    }

    setwikiPath(thread)
    setLoading(false)
    output.classList.remove("hidden")
  }
  
  function handleSearchChange(searchTerm, id) {
    let wikiSuggester = document.querySelector("#wikiSuggester" + id)    
    wikiSuggester.classList.remove("hidden")

    fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${searchTerm}&origin=*`)
    .then((res) => res.json())
    .then((json) => {
      let wikiEl = json[1].map((title) => <li onClick={() => changeSearch(title, id)} className='bg-white hover:bg-green-500 hover:text-white hover:cursor-pointer w-96 p-1' key={title}>{title}</li>)
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

  async function redirectSearch(searchTerm){
    const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${searchTerm}&redirects&format=json&origin=*`);
    const json = await response.json();
  
    let goodSearch = json.query.redirects ? json.query.redirects[0].to : (json.query.normalized? json.query.normalized[0].to : searchTerm); //kalau return searchTerm, return error aja?
    console.log(goodSearch);
    return goodSearch;
  }

  return (
    <>
      
      {/*Logo*/}
      <div className='flex items-center justify-center'>
        <img src={goPediaLogo} className=" h-80" alt="GoPedia logo" />
      </div>

      {/*Title*/}
      <h1 className="text-4xl flex items-center justify-center mb-10 font-bold"><bdi className='text-green-600'>Go</bdi>Pedia</h1>

      {/*Main*/}
      <div className='flex flex-col space-y-5 items-center mb-10'>

        {/*Inputs*/}
        <form method="post" onSubmit={handleWikiSubmit} className="flex flex-col space-y-5 items-center">
          {/*Algortihm Switch*/}
          <div className="flex rounded p-1 text-white mb-1">  
            <p className="text-gray-600 font-semibold text-lg">BFS</p>
            <label htmlFor='methodToggle' className="mx-4 relative inline-flex items-center cursor-pointer">
              <input type="checkbox"  className="sr-only peer" id="methodToggle" name="methodToggle"></input>
              <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full 
              peer-checked:after:border-white after:content-[''] after:absolute after:top-[0.25rem] after:left-[2.5px] 
              after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
              after:transition-all peer-checked:bg-green-500"></div>
            </label>
            <p className="text-green-500 font-semibold text-lg">IDS</p>
          </div>

          {/*Wikipedia Searchbox*/}
          <div className='flex flex-row space-x-12 text-lg'>
            <div className='flex flex-col'>
              <label htmlFor="source" className='text-xl  mb-2'>Web Wikipedia 1:</label>
              <input autoComplete="off" className=' bg-gray-200 appearance-none border-2 border-green-400 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white'
              type="text" id="search1" name="source" required minLength="1" maxLength="40" size="10" onKeyUp={(event) => handleSearchChange(event.target.value, 1)} />
              <ul id = "wikiSuggester1" className="absolute top-[33.4rem] z-10 mb-5 w-[24rem] border-2 border-green-400 rounded overflow-y-auto overflow-x-hidden max-h-96 hidden">
                {validWikiTitle1}
              </ul>
            </div>

            <div className='mt-6 text-2xl'>
              <p>
                ke
              </p>
            </div>
        
            <div className='flex flex-col'>
              <label htmlFor="target" className='text-xl mb-2'>Web Wikipedia 2:</label>
              <input autoComplete="off" className='bg-gray-200 appearance-none border-2 border-green-400 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white'
              type="text" id="search2" name="target" required minLength="1" maxLength="40" size="10" onKeyUp={(event) => handleSearchChange(event.target.value, 2)}/>
              <ul id = "wikiSuggester2" className="absolute top-[33.4rem] z-10 mb-5 w-[24rem] border-2 border-green-400 rounded overflow-y-auto overflow-x-hidden max-h-96 hidden">
                {validWikiTitle2}
              </ul>
            </div>
          </div>

          {/*Search Button*/}
          <div>
            <button type="submit" className='text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-semibold rounded-lg px-8 py-3 text-lg mb-2 focus:outline-none'>
              Search!
            </button>
          </div>

        </form> 

        <MoonLoader
            color = "#22c55e"
            loading = {loading}
            size = {150}
            aria-label="Loading Spinner"
          />

        {/*Output*/}
        <div id="output" className='hidden flex flex-col items-center justify-center mb-10 text-xl border-2 p-2 w-1/2'>
          {outputHeader}
          <div className='flex flex-col mb-5 bg-gray-600 text-white font-semibold text-center w-2/5'>
            {wikiPath}
          </div>
        </div>
        
      </div>

    </>
  )
}

function App() {
  return(
    <><Background/><Main/></>
  );
}

export default App;
