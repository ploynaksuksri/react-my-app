import React, { Component } from 'react';

const Like = ({liked, onLike}) => {
    return ( 
        <i 
            onClick = {onLike}
            className={liked? "fa fa-heart": "fa fa-heart-o"} 
            aria-hidden="true"></i> 
    );
}
 
export default Like;