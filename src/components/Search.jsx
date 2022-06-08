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
    
    <input type="text" value={search} onChange={handleSearch}
      placeholder="Search for Game or Alumni"
    />
    <img src='' alt='search icon' />
    </div>
  )
}

export default Search