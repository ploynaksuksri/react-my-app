import React, { Component } from 'react';

class TableHeader extends Component {
    // columns: array
    // {label:'', path:''}
    // sortColumn: object
    // onSort: function
    raiseSort = path => {
        const {sortColumn} = this.props;
        this.props.onSort(
            {
                path: path,
                order: sortColumn.path === path && sortColumn.order === "asc" 
                        ? "desc" 
                        : "asc"
            });
    }

    render() { 

        const {columns} =this.props;
        return (
            <thead>
                <tr>
                    {
                        columns.map(column => {
                            return (
                                <th key={column.path || column.key}
                                    scope="col" 
                                    onClick= {() => this.raiseSort(column.path)}>
                                        {column.label}
                                </th>
                            );
                        })
                    }
                    <th></th>
                </tr>
            </thead>
        );
    }
}
 
export default TableHeader;