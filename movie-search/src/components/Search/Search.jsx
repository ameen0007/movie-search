import React, { useState} from 'react'
import { useEffect } from 'react'
import  axios from "axios";
import { Searchinput } from './Searchinput/Searchinput'
import { Searchlist } from './Searchlist/Searchlist'
import './Search.css'

export const Search = () => {
  const [userInputValue,setUserInputValue] = useState("")
  const [movieData,setMovieData] = useState([]);
  const [filterData,setFilterData] = useState([]);


   const handlechange = (event)=>{
    setUserInputValue(event.target.value)

   const filtermovie = movieData.filter((data)=>{
      if (data.title){
        return data.title.toLowerCase().includes(event.target.value.toLowerCase());
      }else{
        return data.name.toLowerCase().includes(event.target.value.toLowerCase());
      }
    })
    setFilterData(filtermovie)
 }
   
   const  fetchMovieList = async ()=>{
     const response = await axios ('https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=30acea4d743f82372dde7f19001d12ed',{
      Params : {
        query : "movie",
      }
     });
    setMovieData(response.data.results)
    setFilterData(response.data.results)
   }
     
    useEffect(() => {
      fetchMovieList();
    }, [])
   
    const exit =()=>{
      setUserInputValue("")
      setFilterData([])
    }



  return (
   <div className='search-container'>
    <div className='heading-section'>
        <img src="src\assets\be6d6b251ca93335a4094e81d8497973.png" alt="" />
    </div>
        <Searchinput userInputValue={userInputValue} handlechange= {handlechange} exit={exit}/>
        <Searchlist  filterData={filterData}/>
   </div>
  )
}
