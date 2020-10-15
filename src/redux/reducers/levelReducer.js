
const ADD_LEVEL = 'ADD_LEVEL'

const addLevel = () => {
    return {
        type: ADD_LEVEL
    }
}

export const addLevelThunk = () => {
    return async dispatch => {
        try {
            dispatch(addLevel())
        } catch (error) {
            console.log(error)
        }
    }
}

const initialState = {
    currentLevel: 0,
}

const levelReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_LEVEL: {
            console.log('HELLO')
            const newState = state.currentLevel + 1
            return {
                currentLevel: newState
            }
        }
        default: {
            return state
        }
    }
}

export default levelReducer