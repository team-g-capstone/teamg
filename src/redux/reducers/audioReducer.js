export const STOP_AUDIO = 'STOP_AUDIO'
const START_AUDIO = 'START_AUDIO'


export const startAudio = () => {
    return {
        type: START_AUDIO
    }
}

export const stopAudio = () => {
    return {
        type: STOP_AUDIO
    }
}

export const startAudioThunk = () => {
    return async dispatch => {
        try {
            dispatch(startAudio())
        } catch (error) {
            console.log(error)
        }
    }
}

export const stopAudioThunk = () => {
    return async dispatch => {
        try {
            dispatch(stopAudio())
        } catch (error) {
            console.log(error)
        }
    }
}

const initialState = {
    isPlaying: true, 
}

const audioReducer = (state = initialState, action) => {
    switch(action.type) {
        case START_AUDIO: {
            return {
                isPlaying: true,
            }
        }
        case STOP_AUDIO: {
         
            return {
                isPlaying: false, 
            }
        }

        default: {
            return state
        }
    }
}

export default audioReducer