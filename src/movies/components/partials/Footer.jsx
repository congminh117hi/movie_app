import React from "react";
import { Layout } from 'antd';
const { Footer } = Layout;

const FooterMovies = () => {
    return (
        <Footer
            style={{
                textAlign: 'center',
            }}
        >
            ReactJS 2302 ©2023 Movies App
      </Footer>
    )
}
export default React.memo(FooterMovies)