const Search = ({text, newSearch, onChange}) => {
    return(
        <div>
            {text} <input value={newSearch} onChange={onChange} />
        </div>
    )
}

export default Search