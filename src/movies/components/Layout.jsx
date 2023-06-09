import React from "react";
import HeaderMovies from "./partials/Header";
import ContentMovies from "./partials/Content";
import FooterMovies from "./partials/Footer";
import { Layout } from 'antd';

const LayoutMovies = (props) => {
    return (
        <Layout className="layout">
            <HeaderMovies/>
            <ContentMovies
                level1={props.level1}
                level2={props.level2}
                level3={props.level3}  
            >
                {props.children}
            </ContentMovies>
            <FooterMovies/>
        </Layout>
    )
}
export default React.memo(LayoutMovies)