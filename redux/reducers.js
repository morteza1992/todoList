const todos = (state = state.list, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {...state, list: state.list.concat({id: action.id, title: action.title, isActive: true})}

        case 'TOGGLE_TODO':
            return {
                ...state,
                list: state.list.map(obj =>
                    (obj.id == action.id)
                        ? {...obj, isActive: !obj.isActive}
                        : obj
                )
            }
        case 'CHANGE_TEXT_TODO':
            return {
                ...state,
                list: state.list.map(obj =>
                    (obj.id == action.id)
                        ? {...obj, title: action.title}
                        : obj
                )
            }
        default:
            return state;
    }
}

export default todos