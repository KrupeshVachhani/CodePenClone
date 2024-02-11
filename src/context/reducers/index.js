import { combineReducers } from "redux";
import UserAuthReducer from "./UserAuthReducer";
import projectReducer from "./projectReducer";
import searchReducer from "./searchReducer";

const myReducer = combineReducers({
  // your reducers here
  user: UserAuthReducer,
  projects: projectReducer,
  searchTerm:searchReducer,
});

export default myReducer;
