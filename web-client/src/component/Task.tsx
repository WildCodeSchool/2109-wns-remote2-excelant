import React from 'react';
const taskList = [
    {
        id : 1,
        author: 'Patrick Bruel',
        assignees: [
            'Gilles Lelouche'
        ],
        status: ''
    }
]
function Task(): JSX.Element {
    return (
        <div>
            Hello !
        </div>
    );
}

export default Task;
