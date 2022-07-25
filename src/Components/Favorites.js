import React, { Component } from 'react'
import axios from 'axios';
import { API_KEY } from '../secret';


export class Favorites extends Component {
constructor(){

  super()
this.state={
  movies:[],
  genre:[],
  currGenre:"All Generes"
}
  
}
async componentDidMount() {
  let ans=await axios(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);

  let genreId = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };
 
  let genreArr = [];
  ans.data.results.map((movieObj) => {
    if (!genreArr.includes(genreId[movieObj.genre_ids[0]])) {
      genreArr.push(genreId[movieObj.genre_ids[0]]);
    }
  });
  genreArr.unshift("All Generes");
this.setState({
movies: [...ans.data.results], 
genre:[...genreArr]
});

}



  render() {
    // let movie=movies.results;

    let genreId = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    return (
      <div>

<div className="container text-center">
  <div className="row">
    <div className="col-3" >
    <ul className="list-group fav-list">
  

{
this.state.genre.map((genre)=>(
  this.state.currGenre===genre?(
<li className="list-group-item active" aria-current="true">{genre}</li>
  ):
 (<li className="list-group-item">{genre}</li>)
))

}


  {/* <li className="list-group-item">Fantasy</li>
  <li className="list-group-item">Action</li>
  <li className="list-group-item">Horror</li>
   */}
</ul>
    </div>
   
    <div className="col" >
 <div className='row'>
<input type="text"  className='col' placeholder='search'/>
<input type="text"  className='col' placeholder='5'/>
 </div>
 <div className='row'>
 <table className="table fav-table">
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Genre</th>
      <th scope="col">Popularity</th>
      <th scope="col">Rating</th>
      <th scope="col"></th>

    </tr>
  </thead>
  <tbody>
  
      {
        this.state.movies.map((movieObj)=>(
          <tr>
          <td scope='row' style={{width:"10rem"}}><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movie-image" alt="..."  />
 {movieObj.original_title}</td>
          <td>{genreId[movieObj.genre_ids[0]] }</td>
          <td>{movieObj.popularity}</td>
          <td>{movieObj.vote_average}</td>
          <td>
          <button type="button" className="btn btn-outline-danger">Remove</button>
          </td>
          </tr>
        )
        )
      }
   
  
    
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