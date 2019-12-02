import React from 'react';

import TablePage from "../../../common/Page/TablePage";
import Operation from './Operation';
import List from './List';
import AddRole from './AddRole';
import RolePowerEditer from './RolePowerEditer';

const RoleManage = () => {
    return (
        <TablePage>
            <Operation/>
            <List/>
            <AddRole/>
            <RolePowerEditer/>
        </TablePage>
    );
};

export default RoleManage;
