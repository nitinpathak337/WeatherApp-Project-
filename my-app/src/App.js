



import React from 'react'
import { Component} from 'react'
import {Bars} from 'react-loader-spinner'

import './App.css'


const initialCities=["Delhi","Mumbai","Chennai","Kolkata","Bangalore"]

class App extends Component {

  state={
    data:[],
    apiStatus:""
    
  }

  


  componentDidMount(){
    initialCities.map(eachItem=>this.fetchData(eachItem))
    
  }

  fetchData=async(city)=>{
    this.setState({apiStatus:"InProgress"})
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '8b7b09499cmshf975868ccaf33a7p14b983jsn913be2f6693d',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
      }
    };
  
  const response=await fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`, options)
  const weatherData= await response.json()
  const updatedWeatherData={...weatherData,city}
  console.log(weatherData);
  this.setState(prevState=>({data:[updatedWeatherData,...prevState.data],apiStatus:"Completed"}))
 
  }

  searchInput=(event)=>{
      
      if (event.key==="Enter"){
        
        this.fetchData(event.target.value)
        event.target.value="";
      }
      
  }

  
  render(){
    const {data,apiStatus}=this.state
    
    const shownData=data.slice(0,5);
    
  return (
    <div className="bg">
      <h1>Weather App</h1>
      <input type="search" placeholder='Search City' onKeyDown={this.searchInput} />
      {apiStatus==="Completed" && shownData.length===5?
      (<ul className="list-container">
        {shownData.map((eachItem)=>{
          return(
          <li className='list-item' key={eachItem.city}>
            <h1>City: {eachItem.city}</h1>
            <h2>Temp : {eachItem.temp}<sup>o</sup>C</h2>
            <h2>Humidity : {eachItem.humidity}%</h2>
            <h2>Wind Speed : {eachItem.wind_speed}km/hr</h2>
          </li>)
        })}
      </ul>):
      <div>
        
        <Bars color="white"/>
      </div>}
    </div>
  )
  }
}

export default App




