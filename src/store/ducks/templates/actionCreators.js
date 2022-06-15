export const FetchTemplates = (page, limit) => ({
    type: 'FETCH_TEMPLATES',
    page, 
    limit
});

export const SetTemplates = (payload) => ({
    type: 'SET_TEMPLATES',
    payload
});

export const SetSearch = (payload) => ({
    type: "SET_SEARCH",
    payload
})

export const GetSearch = (text) => ({
    type: "GET_SEARCH",
    text
})

export const deleteTemplateAC = (id) => ({
    type: "DELETE_TEMPLATE",
    id
})