const todos = (state = state.list, action) => {
    let storeState;
    switch (action.type) {
        case 'FILL_TODO':
            storeState = {...state, list: action.data}
            break;
        case 'ADD_TODO':
            storeState = {...state, list: [...state.list, {id: action.id, title: action.title, isActive: true}]}
            break;
        case 'TOGGLE_TODO':
            storeState = {
                ...state, list: state.list.map(obj => (obj.id == action.id) ? {...obj, isActive: !obj.isActive} : obj)
            }
            break;
        case 'CHANGE_TEXT_TODO':
            storeState = {
                ...state, list: state.list.map(obj => (obj.id == action.id) ? {...obj, title: action.title} : obj)
            }
            break;
        case 'DELETE_TODO':
            storeState = {
                ...state, list: state.list.filter(obj => obj.id !== action.id)
            }
            break;
        default:
            storeState = state;
            break;
    }
    if (typeof window !== 'undefined' && storeState.list && storeState.list.length > 0) {
        localStorage.setItem('todoList', JSON.stringify(storeState))
    }
    return storeState
}

export default todos