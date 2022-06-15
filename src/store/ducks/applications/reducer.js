const initialState = {
    data: null,
    pages: null,
    selectData: null,
    isLoding: false
};

export const applicationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ('SET_APPLICATIONS') : {
            return { 
                ...state, 
                data: action.payload.items,
                selectData: action.payload.items,
                pages: action.payload.total_pages, 
                isLoding: false 
            };
        }
        case ('FETCH_APPLICATIONS') : {
            return {...state, data: null}
        } case ('DELETE_APPLICATIONS') : {
            let newData = state.data.filter((item) => {
                return item.id !== action.id
            })
            return { ...state, data: newData, selectData: newData };
        } case ('SELECT_APPLICATIONS') : {
            if (action.payload === 1) {
                let newData = state.data.filter((item) => {
                    return item.type.id === action.payload
                })
                return {...state, selectData: newData} 
            } else if (action.payload === 2) {
                let newData = state.data.filter((item) => {
                    return item.type.id === action.payload
                })
                return {...state, selectData: newData} 
            }
            return {...state, selectData: state.data}
        }
        case ('SET_SEARCH_APPLICATION') : {
            console.log(action.payload)
            return { ...state, selectData: action.payload, isLoding: false };
        }
        case ('GET_SEARCH_APPLICATION') : {
            return {...state, selectData: null}
        }
        default : {
            return state
        }
    }
};