import React from 'react';

import TablePage from "../../../../modules/common/Page/TablePage";
import Operation from './Operation';
import List from './List';
import Editer from './Editer';

const User = () => {
    return (
        <TablePage>
            <Operation/>
            <List/>
            <Editer/>
        </TablePage>
    );
};

export default User;
