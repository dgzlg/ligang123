import React from 'react';
import TablePage from "../../../common/Page/TablePage";
import List from "./List";
import Edit from './Edit';
import Operation from './Operation';

const OrgManage = () => {
    return (
        <TablePage>
            <Operation/>
            <List/>
            <Edit/>
        </TablePage>
    );
};

export default OrgManage;
