import { AddMap, RemoveMap, GetAllMaps, GetMapById, EditMap } from '../actions/actionTypes';

const MAP_ITEMS = localStorage.getItem('mapShapes')
    ? JSON.parse(localStorage.getItem('mapShapes')) : [];

const initialState = {
    items: MAP_ITEMS,
    isLodaing: true
}

function mapReducer(state = initialState, action) {
    switch (action.type) {
        case GetAllMaps:
            return { ...state, items: state.items };
        case GetMapById:
            return { ...state, items: state.items.find(q => q.id === action.payload) };
        case AddMap:
            localStorage.setItem('mapShapes', JSON.stringify(state.items.concat([action.payload])));
            return { ...state, items: state.items.concat([action.payload]) };
        case RemoveMap:
            let data = state.items.filter(q => q.id !== action.payload);
            localStorage.setItem('mapShapes', JSON.stringify(data));
            return { ...state, items: data };
        case EditMap:
            localStorage.setItem('mapShapes', JSON.stringify(action.payload));
            return { ...state, items: action.payload }
        default:
            return state;
    }
}
export default mapReducer;