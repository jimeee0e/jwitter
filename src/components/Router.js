import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      {/* Navigation이 존재하려면, <Navigation /> true여야한다 */}
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route
              exact
              path="/">
              {/* 라우터는 우리에게 userObj를 주고 있음 */}
              <Home userObj={userObj} />
            </Route>
            {/* profile route추가 */}
            <Route
              exact
              path="/profile">
              {/* 이제 profile도 userObj를 Prop으로 받는다.
                즉 이제 어떤 사람이 이 화면을 보고있는지 알 수 있어!!
                그 말은, 이제 우리가 어떤 유저의 Jweets를 불러와야 할 지 안다는 거지*/}
              <Profile userObj={userObj} />
            </Route>
            <Redirect
              from="*"
              to="/"
            />
          </>
        ) : (
          <>
            {/* "/"가 route에 없는 곳으로 가게되면 여기 "/"로 돌아가라  */}
            <Route
              exact
              path="/">
              <Auth />
            </Route>
            {/* <Redirect
              from="*"
              to="/"
            /> */}
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
