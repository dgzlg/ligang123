import {
  SHOW_ORGANIZATION_SELECT,
  SHOW_SOURCE_LIST,
  TOGGLE_ORGANIZATION_LOADING, TOGGLE_SOURCE_LOADING,
  UPDATE_ORGANIZATION_LIST,
  UPDATE_ORGANIZATION_SELECTED, UPDATE_PATH_ARRAY, UPDATE_SOURCE_LIST
} from "./action";

const defaultState = {
  organizationLoading: false,
  organizationList: [],
  organizationTree: [],
  organizationSelected: '',
  /* 资源列表 */
  pathArray: [],
  currentOrganization: null,
  sourceLoading: false,
  sourceList: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SHOW_ORGANIZATION_SELECT:
      return {...state, currentOrganization: null};
    case TOGGLE_ORGANIZATION_LOADING:
      return {...state, organizationLoading: action.loading};
    case UPDATE_ORGANIZATION_LIST:
      return {...state, organizationList: action.list, organizationTree: action.tree, organizationLoading: false};
    case UPDATE_ORGANIZATION_SELECTED:
      return {...state, organizationSelected: action.id};
    case SHOW_SOURCE_LIST:
      return {...state, currentOrganization: action.organization, pathArray: []};
    case TOGGLE_SOURCE_LOADING:
      return {...state, sourceLoading: action.loading};
    case UPDATE_SOURCE_LIST:
      return {...state, sourceList: action.list, sourceLoading: false};
    case UPDATE_PATH_ARRAY:
      return {...state, pathArray: action.pathArray};
    default:
      return state;
  }
};
