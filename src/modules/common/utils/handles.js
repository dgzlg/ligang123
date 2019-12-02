/**
 * 创建tableChange的handle函数
 * @param updateList 更新列表函数
 * @returns {function({current?: *, pageSize: *}, *, *)}
 */
export const createHandleTableChange = (updateList) => {
    return ({ current, pageSize }, filters, sorter) => {
        updateList({
            pageNumber: current,
            pageSize,
            order: sorter.field !== undefined ? `${sorter.field} ${sorter.order === 'ascend' ? 'asc': 'desc'}` : ''
        });
    };
};
