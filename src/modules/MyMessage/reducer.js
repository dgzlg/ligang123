import {
  NEW_CONTACTS,
  UPDATE_CURRENT_CONTACT,
  UPDATE_INPUT_VALUE,
  NEW_MESSAGES,
  UPDATE_MESSAGES,
  OPEN_WIN,
  CLOSE_WIN,
  UPDATE_HISTORY_LOADING,
} from "./action";

const defaultState = {
  visible: false,
  contactsMap: {},
  contacts: [],
  messages: [],
  historyLoading: [],
  currentContact: null,
  inputValue: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case OPEN_WIN:
      return {...state, visible: true};
    case CLOSE_WIN:
      return {...state, visible: false, currentContact: null};
    case UPDATE_CURRENT_CONTACT:
      return {...state, contacts: action.contacts, currentContact: action.currentContact};
    case UPDATE_INPUT_VALUE:
      return {...state, inputValue: action.value};
    case NEW_MESSAGES:
      return {...state, contactsMap: action.contactsMap, contacts: action.contacts, messages: action.messages};
    case UPDATE_MESSAGES:
      return {...state, messages: action.messages};
    case NEW_CONTACTS:
      return {
        ...state,
        contactsMap: action.contactsMap,
        contacts: action.contacts,
        messages: action.messages,
        historyLoading: action.historyLoading,
      };
    case UPDATE_HISTORY_LOADING:
      return {...state, historyLoading: [...action.historyLoading]};
    default:
      return state;
  }
};
