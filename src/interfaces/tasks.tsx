export interface UpdateUserData {
    taskId: string,
    userId: string
}

export interface TaskData {
    name: string,
    deadline: number,
    description: string,
    done?: boolean,
    userId?: string,
    projectId?: string
}

export interface Task {
    name: string,
    deadline: number,
    done?: boolean,
    user: {
        userId: string,
        name: string
    } | null,
    projectId?: string
}

export interface Tasks {
    [key:string]: Task
}

export interface Users {
    [key:string]: {
        firstName: string,
        lastName: string,
        role: string
    }
}

export interface TasksState {
    projectId: string,
    tasks: Tasks,
    users: Users,
    loading: boolean,
    error: boolean
}