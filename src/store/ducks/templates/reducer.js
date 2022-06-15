const initialState = {
    data: null,
    pages: null,
    isAuth: false,
    isLoding: false
};

export const templatesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ('SET_TEMPLATES') : {
            return { 
                ...state, 
                data: action.payload.items, 
                pages: action.payload.total_pages, 
                isLoding: false 
            };
         }
        case ('FETCH_TEMPLATES') : {
            console.log('FETCH TEMPLATES')
            return {...state, data: null}
        }
        case ('SET_SEARCH') : {
            return { ...state, data: action.payload, isLoding: false };
        }
        case ('GET_SEARCH') : {
            return {...state, data: null}
        }
        case ('DELETE_TEMPLATE') : {
            let newData = state.data.filter((item) => {
                return item.id !== action.id
            })
            return { ...state, data: newData };
        }
        default : {
            return state
        }
      }
};