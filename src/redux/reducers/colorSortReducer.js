export const SORTED = 'SORTED'

export const sorted = () => {
    return {
    type: SORTED
}}

const initialState = {
    current: 0, 
}; 

export const sortACircle = () => {
    return async dispatch => {
        try{
            console.log('HEUYHDYG')
            dispatch(sorted())
        } catch (error) {
            console.log("ASJDOHJAd")
            console.log(error)
        }
    }
}

const colorSortReducer = (state = initialState, action) => {
    switch(action.type) {
        case SORTED: {
            console.log(state)
            let newState = state.current
            newState += 1
            console.log(newState, 'Hhellllllooo')
            return {
                current: newState
            }
        }

        default: {
            return state 
        }
    }
}

export default colorSortReducer