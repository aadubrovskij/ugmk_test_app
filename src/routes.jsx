import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { Details } from "./pages/Details/Details";
import {Container} from "./Container";

export const router = createBrowserRouter(createRoutesFromElements(
  <Route
    path='/'
    element={<Container/>}
  >
    <Route
      path='/'
      element={<HomePage/>}
      exact
    />
    <Route
      path='/details/1/:month'
      element={<Details id={1}/>}
    />
    <Route
      path='/details/2/:month'
      element={<Details id={2}/>}
    />
  </Route>
));
