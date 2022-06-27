const todos = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: action.id,
                    title: action.title,
                    isActive: true
                }
            ]
        case 'TOGGLE_TODO':
            return state.map(todo =>
                (todo.id === action.id)
                    ? {...todo, isActive: !todo.isActive}
                    : todo
            )
        default:
            return state;
    }
}

export default todos