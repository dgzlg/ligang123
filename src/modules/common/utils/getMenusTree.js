import { cloneDeep } from 'lodash';

/**
 * 根据菜单一维数组获取菜单树
 * @param menus 菜单一维数组（由id标识唯一性，parentId标识层级）
 * @param keyIndex{object} 确立子父级关系的键索引（默认为id和parentId）
 * @param parentMark 顶层菜单标识（默认为undefined）
 * @returns {Array} 菜单树
 */
export default (menus, keyIndex = { id: 'id', parentId: 'parentId' }, parentMark = undefined) => {
    const { id, parentId } = keyIndex;
    menus = cloneDeep(menus);
    const result = [];
    const menusIndex = (() => {
        const result = {};
        menus.forEach((_, index) => result[_[id]] = index);
        return result;
    })();
    menus.forEach((menu) => {
        if (menu[parentId] === parentMark) {
            result.push(menu);
        } else {
            if (menus[menusIndex[menu[parentId]]].children === undefined) menus[menusIndex[menu[parentId]]].children = [];
            menus[menusIndex[menu[parentId]]].children.push(menu);
        }
    });
    return result;
};
