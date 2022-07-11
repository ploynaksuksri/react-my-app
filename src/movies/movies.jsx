import React, { Component } from 'react';
import Like from '../common/like';
import * as moviesApi from '../services/fakeMovieService';
import * as genreApi from '../services/fakeGenreService';
import Pagination from '../common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from '../common/list-group';
import MovieTable from './movieTable';
import { sort } from '../utils/sort';

class Movies extends Component {
    state = { 
        movies:[],
        genres:[],
        currentPage:1,
        selectedGenre: null,
        pageSize: 4,
        sortColumn: {path: "title", order:"asc"}
    } 

    componentDidMount(){
        this.setState(
            {
                movies: moviesApi.getMovies(),
                genres: [{"_id": null, "name": "All Genres"}, ...this.getGenres()]
            }
        )
    }

    getGenres(){
        return genreApi.getGenres();
    }

    deleteMovie = (movie) => {
        moviesApi.deleteMovie(movie._id);
        const updatedMovies = this.state.movies.filter(m=> m._id !== movie._id);
        this.setState({
            movies: updatedMovies
        });
    }

    likeHandler = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movie};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    }

    handlePageChanged = page => {
        this.setState({currentPage: page})
    }

    handlePreviousClick = page => {
        this.setState({currentPage: page - 1});
    }

    handleNextClick = page => {
        this.setState({currentPage: page + 1});
    }

    handleGenreSelect = genre => {
        this.setState({
            selectedGenre: genre,
            currentPage: 1
        });
    }

    sortHandler = sortColumn => {
        this.setState({sortColumn});
    }

    render() { 
        const {
            movies: allMovies,
            selectedGenre,
            pageSize, 
            currentPage,
            sortColumn
        } = this.state;

        const filteredMovies = selectedGenre && selectedGenre._id
            ?  allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
            :  allMovies;

        const { length: count} = filteredMovies;
        if (count === 0)
            return <p>There is no movies in the database.</p>

        const sortedMovies = sort(filteredMovies, sortColumn.path, sortColumn.order);
        const movies = paginate(sortedMovies, currentPage, pageSize);

        return (
                <div className="row">
                    <div className="col-sm-2">
                        <ListGroup
                            selectedItem={this.state.selectedGenre}
                            items={this.state.genres}
                            onItemSelect={this.handleGenreSelect} />
                    </div>
                    <div className="col">
                        <span>Showing {count} moives in the database</span>
                        <MovieTable 
                            movies={movies}
                            onLike = {this.likeHandler}
                            onDelete = {this.deleteMovie}
                            onSort = {this.sortHandler}
                            sortColumn = {sortColumn}
                        />
                        <Pagination 
                            itemCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChanged={this.handlePageChanged}
                            onPrevious={this.handlePreviousClick}
                            onNext={this.handleNextClick}></Pagination>
                    </div>
                </div>
        );
    }
}
 
export default Movies;