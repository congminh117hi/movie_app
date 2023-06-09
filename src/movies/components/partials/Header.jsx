import React from "react";
import { Layout, Menu} from 'antd';
import { NavLink, useLocation } from "react-router-dom";

const { Header} = Layout;

const HeaderMovies = () => {
    const { pathname } = useLocation();

    const itemsMenus = [
        {label: <NavLink to="/">Trang chu</NavLink>, key: '/'},
        {label: <NavLink to="/upcoming">Phim sap trinh chieu</NavLink>, key: '/upcoming'},
        {label: <NavLink to="/search">Tim kiem</NavLink>, key: '/search'}
    ]
    return(
        <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={pathname}
          items={itemsMenus}
        />
      </Header>
    )
}
export default React.memo(HeaderMovies);