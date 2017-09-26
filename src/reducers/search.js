import {QUERY_IMAGE_BY_KEY} from "../actions/image";

const initialState = {
    foundImages: [],
    length: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case QUERY_IMAGE_BY_KEY:
            return {
                ...state,
                foundImages: action.images,
                length: action.length,
            };
        default:
            return state;
    }
}
