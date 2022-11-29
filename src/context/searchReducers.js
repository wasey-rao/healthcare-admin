export const INITIAL_STATE = {
    query: "test",
    results: [],
    loading: false,
    error: false,
    errorMessage: null,
}

export const searchReducer = (state, action) => {
    switch (action.type) {
        case "SET_QUERY":
            return {
                ...state,
                query: action.payload,
            }
        case "SET_RESULTS":
            return {
                ...state,
                results: action.payload,
            }
        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload,
            }
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload,
            }
        case "SET_ERROR_MESSAGE":
            return {
                ...state,
                errorMessage: action.payload,
            }
        default:
            return state
    }
};