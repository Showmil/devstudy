import React from 'react';
import logo from './logo.svg';
import './App.css';

import Todolist from './Todolist.tsx';
import Clock from './Timer.tsx';
import MyWeather from './MyWeather.tsx'

function App() {
  let name = "리액트";
  return (
    <div className="container"> 
      <Todolist></Todolist>
      <Clock></Clock>
      <MyWeather weather='맑음'>일기예보보</MyWeather>
    </div>
  );
}

export default App;
