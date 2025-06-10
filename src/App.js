import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import FloatingWindow from "./components/FloatingWindow";
import Sidebar from "./components/Sidebar";
import { store } from "@webex/cc-widgets";
import { useEffect, useMemo, useState } from "react";
import {
  ThemeProvider,
  IconProvider,
} from "@momentum-design/components/dist/react";
import { IconNext } from "@momentum-ui/react-collaboration";

function App() {
  console.log("shreyas: this is the source");
  const [isSdkReady, setIsSdkReady] = useState(false);
  const [storeInitialized, setStoreInitialized] = useState(false);
  const [token, setToken] = useState(
    "NzYzNzMxYmMtODYxYS00OGRlLTg0NGEtN2U2ZGUxYmUwZTcyYjc3ZmY4ZTgtMGJl_P0A1_d9ec32d3-2e8d-411a-bcce-eb2e5e2eb79c"
  );
  console.log("Rendered the webexwidgetWrapper");
  const webexConfig = useMemo(() => {
    const config = {
      console: { level: "log" },
      cc: {
        allowMultiLogin: true,
      },
    };

    // if (import.meta.env.MODE === "development") {
    //   config.services = {
    //     discovery: {
    //       u2c: import.meta.env.VITE_U2C_SERVICE_URL,
    //     },
    //   };
    // }

    return config;
  }, []);

  useEffect(() => {
    if (!token) {
      console.error(
        "[WebexWidgetsApp]: No token found, store cannot be initialized"
      );
      return;
    }

    const initStore = () => {
      try {
        if (!storeInitialized) {
          setStoreInitialized(true);
          store
            .init({
              webexConfig,
              access_token: token,
            })
            .then(() => {
              console.log(store);
              setIsSdkReady(true);
              console.info("[WebexWidgetsApp]: Store initialized successfully");
            });
        }
      } catch (error) {
        console.error(
          `[WebexWidgetsApp]: Store initialization failed: ${error}`
        );
      }
    };

    initStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  window.store = store;
  return (
    <ThemeProvider themeclass="mds-theme-stable-lightWebex">
      <IconProvider>
        <BrowserRouter>
          <header>
            <div>
              <IconNext
                ariaLabel=""
                name="cancel"
                scale={32}
                title=""
                weight="regular"
              />
              <Link to="/float">
                <button>Go to Float</button>
              </Link>
              <Link to="/sidebar">
                <button>Go to Sidebar</button>
              </Link>
            </div>
          </header>
          <Routes>
            <Route
              path="float"
              element={<FloatingWindow isSdkReady={isSdkReady} />}
            ></Route>
            <Route
              path="sidebar"
              element={<Sidebar isSdkReady={isSdkReady} />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </IconProvider>
    </ThemeProvider>
  );
}

export default App;
