import { property } from 'lodash';
import React, { Component } from 'react';
import Like from '../common/like';
import _ from 'lodash';

class TableBody extends Component {
    state = {  } 

    renderCell = (item, column) => {
        if (column.content)
            return column.content(item);

        return _.get(item, column.path);
    }

    render() { 
        const { data, columns, onLike, onDelete } = this.props;
        return (
            <tbody>
            {data.map(item => {
                return (              
                    <tr key={item._id}>
                        {columns.map(column => {
                            return (<td>{this.renderCell(item, column)}</td>)
                            })}
                    </tr>         
                );
                }
            )}
        </tbody>
        );
    }
}
 
export default TableBody;