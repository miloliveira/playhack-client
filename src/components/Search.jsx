import React, {useState} from 'react'

function Search(props) {
const [search, setSearch] = useState("")

const{gameSearch}=props

const handleSearch=(e)=>{
setSearch(e.target.value)
gameSearch(e.target.value)
}

  return (
    <div>
    
    <input type="text" value={search} onChange={handleSearch}
      placeholder="Search Bar"
    />
    </div>
  )
}

export default Search