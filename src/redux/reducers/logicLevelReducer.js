
const ADD_LOGIC_LEVEL = 'ADD_LOGIC_LEVEL'
const RESET_LEVEL = 'RESET_LEVEL'
const SET_LEVEL = 'SET_LEVEL'

const addLogicLevel = () => {
    return {
        type: ADD_LOGIC_LEVEL
    }
}

const resetLevel = () => {
    return {
        type: RESET_LEVEL
    }
}

const setLevel = (level) => {
    return {
        type: SET_LEVEL,
        level: level,
    }
}

export const setLevelThunk = (level) => {
    return async (dispatch) => {
        try {
            dispatch(setLevel(level))
        } catch (error) {
            console.log(error)
        }
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

export const resetLevelThunk = () => {
    return async dispatch => {
        try {
            dispatch(resetLevel())
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
        case RESET_LEVEL: {
            return {
                currentLevel: 1,
            }
        }
        case SET_LEVEL: {
            const level = action.level;
            return {
                currentLevel: level
            }
        }
        default: {
            return state
        }
    }
}

export default logicLevelReducer
