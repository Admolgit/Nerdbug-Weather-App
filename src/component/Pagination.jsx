import React from "react";
import _ from "lodash";
import Style from "../style/pagination.module.css";

function Pagination(props) {
  const { itemsCount, pageSize, currentPage, onPageChange, className } = props;
  
  const pagesCount = Math.ceil(itemsCount / pageSize);

  if(pagesCount === 1) return null;

  const pages = _.range(1, pagesCount + 1);
  return (
    <nav className={className}>
      <ul className={Style.Pagination}>
        {pages.map((page) => (
          <li key={page} className={page === currentPage ? Style.PaginationList : Style.PaginationList1}>
            <p className={Style.pageLink} onClick={() => onPageChange(page)}>{page}</p>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;