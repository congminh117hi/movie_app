import React from "react";
import { Row, Col } from "antd";
import LayoutMovies from '../components/Layout'

const SearchMovies = () => {
    return (
        <LayoutMovies
            level1="Trang chu"
            level2="Danh sach"
            level3="Tim kiem phim"
        >
            <Row>
                <Col span={24}>
                    <h4>Tim kiem phim</h4>
                </Col>
            </Row>
        </LayoutMovies>
    )
}
export default React.memo(SearchMovies)