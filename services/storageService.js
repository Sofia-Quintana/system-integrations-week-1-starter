const addTask = (list,task) => {
    list.push(task);
    return list;
}

const deleteTask = (list,id) => {
    const updatedList = list.filter(value => parseInt(value.id) !== parseInt(id));
    return updatedList;
}

const updateTask = (list) => {
    return list;
}

module.exports = {
    addTask,
    deleteTask,
    updateTask
}