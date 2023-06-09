import React from "react";
import { Pagination } from "antd";

const PaginationMovies = ({current, total, changePage }) => {
    return(
        <Pagination style={{textAlign:"center"}} current={current} total={total}
            showSizeChanger={false} 
            onChange={p => changePage(p)}
        />
    )
}
export default React.memo(PaginationMovies)