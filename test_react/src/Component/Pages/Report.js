import React from 'react'
import '../../App.css';
import FormSearch from '../SearchForm/FormSearch'
import ReportPage from '../ReportPage/ReportPage'
import TodoList from '../TodoForm/TodoList';
function Report() {
    return (
        <div>
            <div className="todo-app">
            <TodoList/>
            </div>
            <ReportPage/>
            {/* <FormSearch/> */}
        </div>
    )
}

export default Report
