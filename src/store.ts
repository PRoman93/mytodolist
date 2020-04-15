import {applyMiddleware, combineReducers, createStore} from "redux";
import todolistReducer from "./reducer";
import thunkMiddleware from "redux-thunk";


let rootReducer = combineReducers({
    todolist: todolistReducer,
})
type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// export default store
