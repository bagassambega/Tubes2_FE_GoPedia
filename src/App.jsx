import goPediaLogo from './assets/GoPedia.png'

function App() {

  return (
    <>
      <div className='flex items-center justify-center'>
		<img src={goPediaLogo} className="" alt="GoPedia logo" />
      </div>
      <h1 className="text-4xl flex items-center justify-center mb-10 font-bold"><bdi className='text-green-600'>Go</bdi>Pedia</h1>
      <div className="flex items-center justify-center">
		<form>
		<label htmlFor="search1">Web Wikipedia 1:</label>

		<input className='mb-5 bg-gray-200 appearance-none border-2 border-green-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white'
		type="text" id="search1" name="search1" required minLength="4" maxLength="8" size="10" />
		<label htmlFor="search2">Web Wikipedia 2:</label>

		<input className='bg-gray-200 appearance-none border-2 border-green-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white'
		type="text" id="search1" name="search1" required minLength="4" maxLength="8" size="10" />
		</form>
      </div>
    </>
  )
}

export default App
