const initialState = {
    data: null,
    isAuth: false,
    userLoding: false,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ('SET_USER') : {
            return { ...state, data: action.payload, isAuth: true, userLoding: false };
        }
        case ('LOG_OFF') : {
            console.log('ree')
            return { ...state, data: null, isAuth: false };
        }
        case ('FETCH_USER') : {
            return { ...state, userLoding: true };
        }
        default : {
            return state
        }
      }
};
