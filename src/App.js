import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import CallbackPage from "./pages/callbackpage/callback-page";
import { AuthenticationGuard } from "./components/authenticationguard/authentication-guard";
import LandingPage from "./pages/landingpage/LandingPage";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>

        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<AuthenticationGuard component={List} />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path="/callback" element={<CallbackPage />} />
            <Route path="/landingpage" element={<LandingPage />} />
            
          </Route>
        </Routes>

    </div>
  );
}

export default App;
