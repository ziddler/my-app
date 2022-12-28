import { createStore } from 'redux'


const initialState = {
    showLoading: false,
    selectedMember: {FirstName: ""},
    memberCredits: null,
    memberBundles: null,
    memberUnlimited: null,
}


const customerServiceReducer = (state = initialState, action) => {
    if(action.type === "showLoadingOverlay") {
        state = { ...state,  showLoading : action.value};
        return  state;
    }

    if(action.type === "setMember") {
        console.log("Reducer: setMember");
        state = { ...state,  selectedMember : action.value};
        return  state;
    }

    if(action.type === "setMemberCredits") {
        state = { ...state,  memberCredits : action.value};
        return  state;
    }

    if(action.type === "setMemberBundles") {
        state = { ...state,  memberBundles : action.value};
        return  state;
    }

    if(action.type === "setMemberUnlimited") {
        state = { ...state,  memberUnlimited : action.value==null ? {} : action.value};
        console.log(state);
        return  state;
    }
    return state;
}

 const store = createStore (customerServiceReducer);

 export default store;
