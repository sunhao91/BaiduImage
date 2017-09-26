import {QUERY_MAIN} from "../actions/image";

const initialState = {
    backgrounds: [],
    tags: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case QUERY_MAIN:
            return {
                ...state,
                backgrounds: action.backgrounds,
                tags: action.tags
            };

        default:
            return state;
    }
}
