const initialState = {
    menu: null,
    isAuth: false
};

export const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        case ('SET_MENU') : {
            return { ...state, menu: action.payload, isAuth: true };
        }
        case ('UPDATE_MENU') : {//Template
            return {
                ...state,
            }
        }
        default : {
            return state
        }
      }
};
