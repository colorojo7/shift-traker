export function setUserTasksLS (uid, tasks){
    localStorage.setItem(`userTasks-${uid}`, JSON.stringify(tasks) )
}

export function setUserDataLS (uid, data){
    localStorage.setItem(`userData-${uid}`, JSON.stringify(data) )
}

