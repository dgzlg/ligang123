import React from 'react';

import TablePage from "../../../common/Page/TablePage";
import Operation from './Operation';
import List from './List';

const WaitingManage = () => {
    return (
        <TablePage>
            <Operation/>
            <List/>
        </TablePage>
    );
};

export default WaitingManage;
