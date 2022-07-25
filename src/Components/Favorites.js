import React, { Component } from 'react'

export class Favorites extends Component {
  render() {
    return (
      <div>

<div className="container text-center">
  <div className="row">
    <div className="col-3" >
    <ul className="list-group">
  <li className="list-group-item active" aria-current="true">An active item</li>
  <li className="list-group-item">All Generes</li>
  <li className="list-group-item">Fantasy</li>
  <li className="list-group-item">Action</li>
  <li className="list-group-item">Horror</li>
  
</ul>
    </div>
   
    <div className="col" >
 <div className='row'>
<input type="text"  className='col' placeholder='search'/>
<input type="text"  className='col' placeholder='5'/>
 </div>
 <div className='row'>
 <table class="table">
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Genre</th>
      <th scope="col">Popularity</th>
      <th scope="col">Rating</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    
  </tbody>
</table>
 </div>
    </div>
  </div>
</div>


      </div>
    )
  }
}

export default Favorites