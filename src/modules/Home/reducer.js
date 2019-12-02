import {
  prefix,
  UPDATE_RES_STAT,
  UPDATE_RES_DIST,
  UPDATE_DYNAMIC,
  UPDATE_CONTR_RANK,
  UPDATE_USE_RANK,
} from './action';
import createReducer from '../../modules/common/utils/createReducer';

const defaultState = {
  resStatistics:{},
  resDistribution:[],
  dynamic:[],
  contributionRank:[],
  useRank:[],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_RES_STAT:
      return {
        ...state,
        resStatistics:action.resStatistics,
      }
    case UPDATE_RES_DIST:
        return {
          ...state,
          resDistribution:action.resDistribution,
        }
    case UPDATE_DYNAMIC:
        return {
          ...state,
          dynamic:action.dynamic,
        }
    case UPDATE_CONTR_RANK:
        return {
          ...state,
          contributionRank:action.contributionRank,
        }
    case UPDATE_USE_RANK:
        return {
          ...state,
          useRank:action.useRank,
        }
    default:
      return state;
  }
};