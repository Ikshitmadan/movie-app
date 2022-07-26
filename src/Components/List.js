import React, { Component } from 'react'
import { movies } from './getMovies'
import axios from 'axios'
import { API_KEY } from '../secret';
export class List extends Component {
  constructor() {
    console.log("constructor is called");
    super()
  
    this.state = {
      hover: "",
      parr:[1],
      page:1,
      movie:[],
      favMov:[]
    };
  }
  handleEnter=(id)=>{
    this.setState({
      hover:id
    })
  }
  handleLeave=()=>{
this.setState({
  hover:""
})


  }

  setMovie= async()=>{
    let dataObj=await axios(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.page}`);
    this.setState({
      movie:[...dataObj.data.results]
    })
    console.log("next-page");
  }
  handleNext=()=>{
    console.log("hello");
    let tempArr=[];
    for(let i=1;i<=this.state.parr.length+1;i++)
    {
      tempArr.push(i);
    }
    
    this.setState({
      parr:[...tempArr],
      page:this.state.page+1
    },this.setMovie)
    
  }
  handlePrevious=()=>{
    console.log("bye");
    let tempArr=[];
    for(let i=1;i<this.state.parr.length;i++)
    {
      tempArr.push(i);
    }

    if(tempArr.length===0)
    {
      return;
    }
    this.setState({

      parr:[...tempArr],
      page:this.state.page-1
    },this.setMovie)

  }
  handlePage=(currPage)=>{
    let tempArr=[];
    for(let i=1;i<=currPage;i++)
    {
      tempArr.push(i);
    }

    this.setState({

      parr:[...tempArr],
      page:currPage
    },this.setMovie)
  }

  handleFavorites=(movieObj)=>{
    let localStorageMovies = JSON.parse(localStorage.getItem("movies")) || [];
   
    if (this.state.favMov.includes(movieObj.id)) {
      localStorageMovies = localStorageMovies.filter(
        (movie) => movie.id != movieObj.id
      );
    }
    else localStorageMovies.push(movieObj);
    console.log(localStorageMovies);
    
    localStorage.setItem("movies", JSON.stringify(localStorageMovies));

    let tempData = localStorageMovies.map(movieObj => movieObj.id);
    this.setState({
      favMov: [...tempData]
    });
  }

 async componentDidMount(){
console.log("componentDidMount is called");
  let dataObj=await axios(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.page}`);
this.setState({
  movie:[...dataObj.data.results]
})

  // console.log(dataObj.data);
}


  render()  {

    console.log("render is called");
 
    return (
      <>
      {
        this.state.movie.length===0?
        (
 
              <div className="spinner-border text-primary" role="status">
     <span className="sr-only">Loading...</span>

   </div>):
   (
    <div>
    <h3 className="text-center"><strong>Trending Movies</strong></h3>
    <div className='movies-list'>
{
    this.state.movie.map((movieObj)=>(
        <div className="card movie-card" onMouseEnter={()=>this.handleEnter(movieObj.id)} onMouseLeave={()=>this.handleLeave()}>
         
    <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movie-image" alt="..." />
 
      <h5 className="card-title movie-title ">{movieObj.original_title}</h5>

{
  this.state.hover===movieObj.id&&<div className=' favorites-btn'>
  <a href="#" className="btn btn-primary" onClick={()=>this.handleFavorites(movieObj)}>Add to Favorites</a>
  </div>
} 
  </div> 
    )

    )
    
}
</div>
<div className="pagination">
<nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item"><a className="page-link" href="#"  onClick={()=>this.handlePrevious()}>Previous</a></li>
{
  this.state.parr.map((pageNo)=>(
    <li className="page-item"><a className="page-link" href="#" onClick={()=>{this.handlePage(pageNo)}}>{pageNo} </a></li>
  ))
}
   

    <li className="page-item"><a className="page-link" href="#" onClick={()=>this.handleNext()}>Next</a></li>
  </ul>
</nav>
</div>

    

</div>
   )

   
     



  }

</>
      
    )
  }
}


export default List