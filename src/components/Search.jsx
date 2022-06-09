import React, {useState} from 'react'

function Search(props) {
const [search, setSearch] = useState("")

const{gameSearch}=props

const handleSearch=(e)=>{
setSearch(e.target.value)
gameSearch(e.target.value)
}

  return (
    <div className='searchBarDiv'>
    
    <input className='sbInput' type="text" value={search} onChange={handleSearch}
      placeholder="Search for Game or Alumni"
    />
    <img src='https://res.cloudinary.com/dzwl5teme/image/upload/v1654766013/playHack/lupa_sapt5q.png' alt='search icon' id='searchBarIcon' />
    </div>
  )
}

export default Search