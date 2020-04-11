import {applyMiddleware, combineReducers, createStore} from "redux";
import todolistReducer from "./reducer";
import thunkMiddleware from "redux-thunk";


let rootReducer = combineReducers({
    todolist:todolistReducer
})
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

window.store = store;
export default store;
