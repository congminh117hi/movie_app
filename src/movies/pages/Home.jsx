import React, { useState, useEffect } from "react";
import { Row, Col, Skeleton } from "antd";
import LayoutMovies from '../components/Layout'
import { api } from "../services/api";
import { helpers } from "../helpers";
import ListMovies from "../components/ListMovies";
import PaginationMovies from "../components/Pagination";

const HomeMovies = () => {
    const [loading, setLoading] = useState(true);
    const [popularMovies, setPopularMovies] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [totalResult, setTotalResult] = useState(0);


    useEffect(() => {
        // call 1 lan sau khi render
        let checking = false;
        const getData = async () => {
            setLoading(true);
            const dataMovies = await api.getDataPopularMovies(page);
            if(helpers.isEmptyObject(dataMovies)){
                // ko co du lieu
                setError({
                    cod: 404,
                    mess: "Not found data"
                });
            }else{
                // co du lieu
                setPopularMovies(dataMovies['results']);

                if(page === 1 && !checking){
                    setTotalPage(dataMovies['total_pages']);
                    setTotalResult(dataMovies['total_results']);
                }        
                setError(null);
            }
            setLoading(false); //hoan thanh
        }
        getData();

        // clear up
        return() => {
            checking = true;
        }
    }, [page]);  //khi page thay doi thi useEffect tu dong chay lai ( dieu kien cua useEffect)

    const changePageMovies = (p) => {
        if(p >= 1 && p <= totalPage){
            // cap nhat lai state page
            // p: so trang nguoi dung bam o giao dien
            setPage(p);
        }
    }

    if(loading){
        return (
            <LayoutMovies
            level1="Trang chu"
            level2="Danh sach"
            level3="Phim xem nhieu"
        >
            <Row>
                <Col span={24}>
                    <Skeleton active />
                </Col>
            </Row>
        </LayoutMovies>
        )
    }

    return (
        <LayoutMovies
            level1="Trang chu"
            level2="Danh sach"
            level3="Phim xem nhieu"
        >
            <Row>
                <Col span={24}>
                    <ListMovies
                        movies = {popularMovies}
                    />
                    {popularMovies.length > 0 && 
                    <PaginationMovies
                        current={page}
                        total={totalResult}
                        changePage={changePageMovies}
                    />
                    }
                </Col>
            </Row>
        </LayoutMovies>
    )
}
export default React.memo(HomeMovies)