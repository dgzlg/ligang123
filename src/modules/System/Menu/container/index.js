import React from 'react';
import TablePage from "../../../common/Page/TablePage";
import MenuList from "./MenuList";
import MenuEditer from './MenuEditer';
import ElementModal from './ElementModal';
import MenuOperation from './MenuOperation';

const MenuManage = () => {
    return (
        <TablePage>
            <MenuOperation/>
            <MenuList/>
            <MenuEditer/>
            <ElementModal/>
        </TablePage>
    );
};

export default MenuManage;
