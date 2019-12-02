import React from 'react';
import TablePage from "../../../common/Page/TablePage";
import List from "./List";
import Operation from './Operation';

const Center = () => {
    return (
        <TablePage>
            <Operation/>
            <List/>
        </TablePage>
    );
};

export default Center;
