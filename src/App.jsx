import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/body";
import Login from "./components/login";
import Profile from "./components/profile";
import { Provider } from "react-redux";
import appStore from "./utils/app-store";
import Feed from "./components/feed";
import Connections from "./components/connections";
import Requests from "./components/requests";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route
              path="/"
              element={<Body />}
            >
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/"
                element={<Feed />}
              />
              <Route
                path="/profile"
                element={<Profile />}
              />
              <Route
                path="/connections"
                element={<Connections />}
              />
              <Route
                path="/requests"
                element={<Requests />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
