import {applyMiddleware, combineReducers, createStore} from "redux";
import rootReducer from "./reducer";
import thunkMiddleware from "redux-thunk";


let rootReducer = combineReducers({
    todolist:rootReducer
})
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

window.store = store;
export default store;
