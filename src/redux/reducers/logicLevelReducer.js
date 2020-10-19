
const ADD_LOGIC_LEVEL = 'ADD_LOGIC_LEVEL'

const addLogicLevel = () => {
    return {
        type: ADD_LOGIC_LEVEL
    }
}

export const addLogicLevelThunk = () => {
    return async dispatch => {
        try {
            dispatch(addLogicLevel())
        } catch (error) {
            console.log(error)
        }
    }
}

const initialState = {
    currentLevel: 1,
}

const logicLevelReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_LOGIC_LEVEL: {
            
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

export default logicLevelReducer