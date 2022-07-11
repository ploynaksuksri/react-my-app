import React from 'react';
import _ from 'lodash';
import { PropTypes } from 'prop-types';

const Pagination = props=> {
    const  {itemCount, pageSize,currentPage, onPageChanged, onPrevious, onNext} = props;
    const pageCount = Math.ceil(itemCount / pageSize);    
    if (pageCount === 1) return null;

    const pages = _.range(1, pageCount +1);

    return ( 
        <nav>
            <ul className="pagination">
            <li className={currentPage === 1 ? "page-item disabled" : "page-item"}
                onClick = {() => onPrevious(currentPage)}>
                <span className="page-link">Previous</span>
            </li>
                {pages.map((pageNumber) => {  
                    return (
                        <li 
                            key = {pageNumber}
                            className={currentPage === pageNumber ? "page-item active": "page-item"}>
                            <a 
                                onClick={() => onPageChanged(pageNumber)}
                                className="page-link">{pageNumber}</a>
                        </li>    
                    )
                })}       
            <li className={currentPage === pageCount ? "page-item disabled" : "page-item"}
                onClick={() => onNext(currentPage)}>
                <a className="page-link" href="#">Next</a>
            </li>       
            </ul>
        </nav>
     );
}

Pagination.propTypes = {
    itemCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChanged: PropTypes.func.isRequired
}

export default Pagination;