import React, { Component } from 'react'
import axios from 'axios';
import { API_KEY } from '../secret';



export class Favorites extends Component {
constructor(){

  super()
this.state={
  movies:[],
  genre:[],
  currGenre:"All Generes",
  currText:""
}
  
}

handleCurrGenre=(Genre)=>{
  
  this.setState({
    currGenre:Genre
  });
  
}

handleText=(e)=>{
  this.setState({
    currText: e.target.value

  });
}
sortRatingAsc=()=>{

  let allMovies = this.state.movies;
  allMovies.sort((objA, objB) => {
    return objA.vote_average - objB.vote_average;
  });
  this.setState({
    movies: [...allMovies],
  });

}
sortRatingDsc=()=>{

  let allMovies = this.state.movies;
  allMovies.sort((objA, objB) => {
    return  objB.vote_average -objA.vote_average ;
  });
  this.setState({
    movies: [...allMovies],
  });

}
sortPopularityAsc=()=>{
  let allMovies = this.state.movies;
  allMovies.sort((objA, objB) => {
    return  objA.popularity -objB.popularity ;
  });
  this.setState({
    movies: [...allMovies],
  });

}

sortPopularityDsc=()=>{
  let allMovies = this.state.movies;
  allMovies.sort((objA, objB) => {
    return  objB.popularity -objA.popularity ;
  });
  this.setState({
    movies: [...allMovies],
  });

}

deleteFav=(movieObj)=>{

  let TempMovie=this.state.movies.filter((movie)=>movie.id!=movieObj.id)
  this.setState({
    movies:[...TempMovie]
  })
  localStorage.setItem("movies",JSON.stringify(TempMovie));
}


async componentDidMount() {
  console.log("component did mount of favoraites");
  let results = JSON.parse(localStorage.getItem("movies"))||[];
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
  results.map((movieObj) => {
    if (!genreArr.includes(genreId[movieObj.genre_ids[0]])) {
      genreArr.push(genreId[movieObj.genre_ids[0]]);
    }
  });

  genreArr.unshift("All Generes");
  console.log(genreArr);
  this.setState({
    movies: [...results], 
    genre: [...genreArr],
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
    let filteredMovies = this.state.movies;

    if (this.state.currText === "") {
      filteredMovies = this.state.movies;
    } else {
      filteredMovies = filteredMovies.filter((movieObj) => {
        let movieName = movieObj.original_title.toLowerCase();
        return movieName.includes(this.state.currText); 
      });
    }

    if (this.state.currGenre != "All Generes") {
      filteredMovies = filteredMovies.filter(
        (movieObj) => genreId[movieObj.genre_ids[0]] == this.state.currGenre
      );
    }


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
 (<li className="list-group-item" onClick={()=>this.handleCurrGenre(genre)}>{genre}</li>)
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
<input type="text"  className='col' placeholder='search'   value={this.state.currText}  onChange={this.handleText}/>
<input type="text"  className='col' placeholder='5'/>
 </div>
 <div className='row'>``
 <table className="table fav-table">
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Genre</th>
      <th scope="col"> 
      
      <i
          className="fa-solid fa-angle-up"
          style={{padding:"10px"}}    onClick={()=>this.sortPopularityAsc()}      />
       Popularity
       <i
           className="fa-solid fa-angle-down"
                     
                  style={{padding:"8px"}}  onClick={()=>this.sortPopularityDsc()} />
       
       </th>
     
      <th scope="col">
        
      <i
          className="fa-solid fa-angle-up"
          style={{padding:"10px"}}      onClick={()=>this.sortRatingAsc()}     />

        
        Rating
        <i
           className="fa-solid fa-angle-down"
                     
                  style={{padding:"8px"}} onClick={()=>this.sortRatingDsc()} />
        </th>

      <th scope="col"></th>

    </tr>
  </thead>
  <tbody>
  
      {
        filteredMovies.map((movieObj)=>(
          <tr>
          <td scope='row' style={{width:"10rem"}}><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movie-image" alt="..."  />
 {movieObj.original_title}</td>
          <td>{genreId[movieObj.genre_ids[0]] }</td>
          <td>{movieObj.popularity}</td>
          <td>{movieObj.vote_average}</td>
          <td>
          <button type="button" className="btn btn-outline-danger" onClick={()=>this.deleteFav(movieObj)}>Remove </button>
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