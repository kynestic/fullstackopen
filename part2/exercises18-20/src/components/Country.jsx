const Country = ({country, visible, handleVisible}) => {
    let display = {'display': 'block'}
    let hidden = {'display': 'none'}
    console.log(999);
    return (
        <div>
          <h2>
              {country.name.common}
          </h2>
          <button onClick={handleVisible}>{!visible? 'show': 'hide'}</button>
          <div style={visible? display: hidden}>
            <img src= {country.flags.png? country.flags.png: country.flags.svg} alt={country.flags.alt} />
            <div><b>Capital: </b>{country.capital}</div>
            <div><b>Languages:</b></div>
            <ul>
              {Object
                .entries(country.languages)
                .map(([code, language]) => 
                  <li key={`${country.name.official}${code}`}>{language}</li>)
              }
            </ul>
          </div>
      </div>
    )
}

export default Country