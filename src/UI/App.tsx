import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import {connect} from "react-redux";
import AddNewItemForm from "./AddNewItemForm";
import {TodoListType} from "../types/entities";
import Preloader from "../accets/Preloader";
import {AppStateType} from "../BLL/store";
import {addTodo, getTodo} from "../BLL/reducer";
import {AppBar, Container, Grid, IconButton, Paper} from "@material-ui/core";


type MapStateProps = {
    todolists: Array<TodoListType>,
    preloader: boolean,
    disabled: boolean,
    disabledDeleteTodolist?: boolean,
}
type MapDispatchProps = {
    setTodolists: () => void,
    addTodolist: (newTodolist: string) => void
}

class App extends React.Component<MapStateProps & MapDispatchProps> {

    addTodoList = (newTodolist: string) => {
        this.props.addTodolist(newTodolist)
    }

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        this.props.setTodolists()
    }

    render = () => {
        const todolists = this.props
            .todolists
            .map(tl =>
                <Container fixed>
                    <Grid container spacing={3} item>
                        <Paper style={{padding: '10px', margin:'20px'}}>
                            <TodoList
                                preloader={tl.preloader}
                                key={tl.id}
                                id={tl.id}
                                title={tl.title}
                                tasks={tl.tasks}
                                disabled={tl.disabled}
                                disabledDeleteTodolist={tl.disabledDeleteTodolist}
                                todolists={this.props.todolists}
                            />
                        </Paper>
                    </Grid>
                </Container>
            )

        return (
            <>
                {
                    this.props.preloader
                        ? <Preloader/>
                        : <>
                            <div className="App">
                                <AppBar position='static'>
                                    <Grid container spacing={3} style={{padding: '40px'}}>
                                        <AddNewItemForm addItem={this.addTodoList}
                                                        disabledAddTodo={this.props.disabled}
                                        />
                                    </Grid>
                                    {/*<Container fixed>*/}
                                    {/*    <Grid container spacing={3} item>*/}
                                    {/*        <Paper style={{padding:'10px'}}>*/}
                                    {todolists}
                                    {/*        </Paper>*/}

                                    {/*    </Grid>*/}
                                    {/*</Container>*/}
                                </AppBar>
                            </div>
                        </>
                }
            </>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStateProps => {
    return {
        todolists: state.todolist.todolists,
        preloader: state.todolist.preloader,
        disabled: state.todolist.disabled
    }
}
const mapDispatchToProps = (dispatch: any): MapDispatchProps => { //
    return {
        setTodolists: () => {
            const thunk = getTodo();
            dispatch(thunk)
        },
        addTodolist: (newTodolist: string) => {
            const thunk = addTodo(newTodolist);
            dispatch(thunk)
        }
    }
}
const ConnectedApp = connect<MapStateProps, MapDispatchProps, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

