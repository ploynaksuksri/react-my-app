import React, { Component } from 'react';

const ListGroup = props => {
    const {selectedItem, items, onItemSelect, textProperty, valueProperty} = props;
    
    return (  
        <div className="list-group">
            {items.map((item => {
                return (
                <a 
                    key={item[valueProperty]}
                    onClick={() => onItemSelect(item)}
                    className={
                        selectedItem 
                        && selectedItem[valueProperty] === item[valueProperty]
                        ? "list-group-item list-group-item-action active" 
                        : "list-group-item list-group-item-action"}>
                    {item[textProperty]}
                </a>    
                )
            }))}
        </div>
    );
}

ListGroup.defaultProps = {
    valueProperty: "_id",
    textProperty: "name"
}
 
export default ListGroup;