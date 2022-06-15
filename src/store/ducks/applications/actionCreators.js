export const FetchApplications = (page) => ({
    type: 'FETCH_APPLICATIONS',
    page, 
});

export const SetApplications = (payload) => ({
    type: 'SET_APPLICATIONS',
    payload
});
export const SelectApplications = (payload) => ({
    type: 'SELECT_APPLICATIONS',
    payload
});
export const deleteApplicationsAC = (id) => ({
    type: "DELETE_APPLICATIONS",
    id
})


export const SetSearchApplication = (payload) => ({
    type: "SET_SEARCH_APPLICATION",
    payload
})

export const GetSearchApplication = (searchName, searchEmail, searchTel) => ({
    type: "GET_SEARCH_APPLICATION",
    searchName, 
    searchEmail, 
    searchTel
})