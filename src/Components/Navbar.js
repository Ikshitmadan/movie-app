import React, { Component } from 'react'
import {Link}from 'react-router-dom'
export class Navbar extends Component {
  render() {
    return (
      <div style={{display:'flex',background:'white',padding:'1rem',justifyContent:'center',alignItems:'center'}}>
        <h1> 
        <Link to="/" style={{textDecoration:"none"}}>Movies</Link>
          </h1>
        <h1  style={{marginLeft:'2rem'}}>
        <Link to="favorites" style={{textDecoration:"none"}} >Favorites</Link>
         </h1>

      </div>
    )
  }
}

export default Navbar