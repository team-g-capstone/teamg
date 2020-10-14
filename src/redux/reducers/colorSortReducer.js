export const SORTED = 'SORTED'
const RESET = 'RESET'

export const sorted = () => {
    return {
    type: SORTED
}}

export const reset = () => {
    return {
        type: RESET
    }
}

const initialState = {
    current: 0, 
}; 

export const sortACircle = () => {
    return async dispatch => {
        try{
            
            dispatch(sorted())
        } catch (error) {
            
            console.log(error)
        }
    }
}

export const resetSorted = () => {
    return async dispatch => {
        try {
            dispatch(reset())
        } catch (error) {
            console.log(error)
        }
    }
}

const colorSortReducer = (state = initialState, action) => {
    switch(action.type) {
        case SORTED: {
          
            let newState = state.current
            newState += 1
           
            return {
                current: newState
            }
        }
        case RESET: {
            return {
                current: 0, 
            }
        }

        default: {
            return state 
        }
    }
}

export default colorSortReducer