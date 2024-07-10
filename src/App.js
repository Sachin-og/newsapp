import './App.css';
import React, { Component} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
export default class App extends Component {
  apiKey=process.env.REACT_APP_NEWS_API
  state ={
    progress:0,
  }
  setProgress = (progress)=>{
    this.setState({
      progress: progress,
    })
  }
  render() {
    return (
      <>
      <Router>
        <Navbar />
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        onLoaderFinished={this.setProgress}
        height = {3}
      />
        <div className="container my-4">
          <Routes>
            <Route exact path="newsapp/business" element={<News setProgress= {this.setProgress} apiKey={this.apiKey}  key= "business" pageSize = {21} category ="business"/>}></Route>
            <Route exact path="newsapp/entertainment"element={<News setProgress= {this.setProgress} apiKey={this.apiKey}  key= "entertainment" pageSize = {21} category ="entertainment"/>}></Route>
            <Route exact path="newsapp/sports" element={<News setProgress= {this.setProgress} apiKey={this.apiKey}  key= "sports" pageSize = {21} category ="sports"/>}></Route>
            <Route exact path="newsapp/science" element={<News setProgress= {this.setProgress} apiKey={this.apiKey}  key= "science" pageSize = {21} category ="science"/>}></Route>
            <Route exact path="newsapp/technology" element={<News setProgress= {this.setProgress} apiKey={this.apiKey}  key= "technology" pageSize = {21} category ="technology"/>}></Route>
            <Route exact path="newsapp/health" element={<News setProgress= {this.setProgress} apiKey={this.apiKey}  key= "health" pageSize = {21} category ="health"/>}></Route>
            <Route exact path="newsapp/general" element={<News setProgress= {this.setProgress} apiKey={this.apiKey}  key= "general" pageSize = {21} category ="general"/>}></Route>
            <Route
              exact path="/newsapp/"
              element={
              <News setProgress= {this.setProgress} apiKey={this.apiKey}  pageSize = {21} category ="general"/>
               }
            ></Route>
          </Routes> 
        </div>
       </Router> 
    </>
    )
  }
}

