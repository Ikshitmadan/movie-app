import React, { Component } from 'react'

export class Navbar extends Component {
  render() {
    return (
      <div style={{display:'flex',background:'white',padding:'1rem',justifyContent:'center',alignItems:'center'}}>
        <h1>Movies</h1>
        <h1 style={{marginLeft:'2rem'}}>Favorites </h1>
      </div>
    )
  }
}

export default Navbar