import React, { Suspense, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Style from "./App.module.css";

import routes from "_core/router/routes";
import { RouterProps, useHistory } from "react-router";
import ChangeDataService, { CHANGED_DATA_MESSAGE } from "_common/service/ChangeDataService";
import NotificationProvider from "_common/component/notification/NotificationProvider";

export interface AppProps {}

function App(props: AppProps) {

let history = useHistory();
  useEffect(() => {
   
    history.block(() => {
      // The location and action arguments indicate the location
      // we're transitioning to and how we're getting there.

      // A common use case is to prevent the user from leaving the
      // page if there's a form they haven't submitted yet.
      if (ChangeDataService.isDirty()) {
        return CHANGED_DATA_MESSAGE;
      }
    });
    return history.listen(() => {
      ChangeDataService.clean();
    });
  }, [history]);

  return (
    <div className={Style.root}>
      <Suspense fallback={<div>Chargement...</div>}>
        <Switch>
          {routes.map((route: any) => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              render={(props: RouterProps) => {
                return (
                  <>
                    <main className={Style.main}>
                      <route.component key="right" {...props} routes={route.routes} />
                    </main>

                    <footer />
                  </>
                );
              }}
            />
          ))}
        </Switch>
      </Suspense>
      <NotificationProvider />
    </div>
  );
}

export default App;
