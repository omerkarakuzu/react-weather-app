import React, { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { GEO_API_URL,geoApiOptions } from '../../api';

function Search({onSearchChange}) {

    const [search,setSearch] = useState(null);
    const handleOnChange = (searchData) => 
    {
        setSearch(searchData);
        onSearchChange(searchData)
    };

    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}/cities?minPopulation=250000&namePrefix=${inputValue}`, geoApiOptions)
            .then( (response) => response.json())
            .then( (response) => {
                return {
                    options: response.data.map((city) =>{
                        return{
                            value: `${city.latitude} ${city.longitude}`,
                            label:`${city.name}, ${city.countryCode}`
                        }
                    })
                }
            })
        .catch(error => console.log(error));
        
    }

  return (
    <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={560}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
    
    />
  )
}

export default Search