import React from 'react'
import '../../App.css';

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
