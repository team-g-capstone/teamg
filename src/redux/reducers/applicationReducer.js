import manifest from "../../../app.json";

export const INIT = "[INIT]";
export const INIT_APPLICATION = `${INIT} Set Initial values for the application`;

export const initialiseApplication = () => ({
  type: INIT_APPLICATION,
  payload: {},
});

const {
  expo: { name, version },
} = manifest;

const initialState = {
  status: false,
  version: -1,
};

const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_APPLICATION: {
      return {
        status: true,
        version,
        name,
      };
    }

    default: {
      return state;
    }
  }
};

export default applicationReducer;
