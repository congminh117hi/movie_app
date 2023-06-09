import React, { useState } from "react";
import { Row, Col, DatePicker, Skeleton } from "antd";
import LayoutMovies from "../components/Layout";
import moment from "moment";
import { api } from "../services/api";
import { helpers } from "../helpers";
import ListMovies from "../components/ListMovies";
import PaginationMovies from "../components/Pagination";

const { RangePicker } = DatePicker;



const UpcomingMovies = () => {
    const [loading, setLoading] = useState(false);
    const [dataMovies, setDataMovies] = useState([]);
    const [errors, setErrors] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [totalResult, setTotalResult] = useState(0);
    const [sDate, setStartDate] = useState(null);
    const [eDate, setEndDate] = useState(null);

    const changeDate = async (date, dateString) => {
        setLoading(true);
        const [startDate, endDate] = dateString;
        setStartDate(startDate);
        setEndDate(endDate);
        const data = await api.getDataMoviesByDate(startDate, endDate, page);
        if (!helpers.isEmptyObject(data)) {
            // co du lieu
            setDataMovies(data['results'])
            if(page ===1){
                setTotalPage(data['total_pages']);
                setTotalResult(data['total_results']);
            }
            setErrors(null);
        } else {
            // kh co du lieu
            setErrors({
                code: 404,
                mess: ' Not found data'
            })
        }
        setLoading(false);
    }
    const changePageMovies = (p) => {
        if(p >= 1 && p <= totalPage){
            // cap nhat lai state page
            // p: so trang nguoi dung bam o giao dien
            setPage(p);
            const stringDate = [sDate, eDate];
            changeDate(null, stringDate);
        }
    }
    if (loading) {
        return (
            <LayoutMovies
                level1="Trang chu"
                level2="Chi tiet"
                level3="Phim sap ra rap"
            >
                <Row>
                    <Col span={24}>
                        <Skeleton active />
                    </Col>
                </Row>
            </LayoutMovies>
        )
    }
    if (errors !== null) {
        <LayoutMovies
            level1="Trang chu"
            level2="Chi tiet"
            level3="Phim sap ra rap"
        >
            <Row>
                <Col span={24}>
                    <h3>{errors.mess}</h3>
                </Col>
            </Row>
        </LayoutMovies>
    }

    return (
        <LayoutMovies level1="Trang chu" level2="Danh sach" level3="Phim sap chieu">
            <Row>
                <Col span={24}>
                    <h4>Phim sap trinh chieu</h4>
                    <Row>
                        <Col span={24}>
                            <RangePicker
                                defaultValue={moment()}
                                format={"YYYY-MM-DD"}
                                disabledDate={(current) => {
                                    return current && current < moment().endOf("day");
                                }}
                                onChange={(d, dt) => changeDate(d, dt)}
                            />
                            <ListMovies
                                movies={dataMovies}
                            />
                            {dataMovies.length > 0 &&
                                <PaginationMovies
                                    current={page}
                                    total={totalResult}
                                    changePage={changePageMovies}
                                />
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        </LayoutMovies>
    );
};
export default React.memo(UpcomingMovies);