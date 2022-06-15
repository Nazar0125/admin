export const FetchMenu = (payload) => ({
    type: 'FETCH_MENU',
});

export const SetMenu = (payload) => ({
    type: 'SET_MENU',
    payload
});

export const updataMenu = (id, template) => ({
    type: 'UPDATE_MENU',
    id,
    template
});