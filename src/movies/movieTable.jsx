import React, { Component } from 'react';
import Like from '../common/like';
import TableBody from '../common/tableBody';
import TableHeader from '../common/tableHeader';

class MovieTable extends Component {
    columns = [
        {path: "title", label: "Title"},
        {path: "genre.name", label: "name"},
        {path: "numberInStock", label: "Stock"},
        {path: "dailyRentalRate", label: "Rate"},
        {key: "like", 
        content: item => (<Like onLike = {() => this.props.onLike(item)} liked={item.liked}/>)},
        {key: "delete", content: item => (
            <button 
            className="btn btn-danger"
            onClick={() => this.props.onDelete(item)}>
                Delete
            </button>)}
    ];

    render() { 
        const {movies, onDelete, onLike, sortColumn, onSort} = this.props;
        return (
            <table className="table">
            <TableHeader 
                columns={this.columns}
                sortColumn={sortColumn}
                onSort = {onSort}/>
            <TableBody
                data = {movies}
                columns = {this.columns}
                onDelete = {onDelete}
                onLike = {onLike} />
        </table>

        );
    }
}
 
export default MovieTable;