
const ADD_LEVEL = 'ADD_LEVEL'
const SET_LEVEL = 'SET_LEVEL'
const addLevel = () => {
    return {
        type: ADD_LEVEL
    }
}
const setLevel = (level) => {
    return {
        type: SET_LEVEL,
        level: level,
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
export const setLevelThunk = (level) => {
    return async (dispatch) => {
        try {
            dispatch(setLevel(level))
        } catch (error) {
            console.log(error)
        }
    }
}
const initialState = {
    currentLevel: 1,
}
const levelReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_LEVEL: {
            console.log('HI')
            const newState = state.currentLevel + 1
            return {
                currentLevel: newState
            }
        }
        case SET_LEVEL: {
            const level = action.level;
            console.log("level from level reducer", level)
            return {
                currentLevel: level
            }
        }
        default: {
            return state
        }
    }
}
export default levelReducer
















