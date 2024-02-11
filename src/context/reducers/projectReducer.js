const initialState = {
  user: null, // or whatever initial state you want
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROJECTS":
      return {
        ...state,
        projects: action.projects,
      };
    case "SET_PROJECTS_NULL":
      return {
        ...state,
        projects: null,
      };
    default:
      return state;
  }
};

export default projectReducer;
