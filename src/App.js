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
    "eyJhbGciOiJSUzI1NiJ9.eyJjbHVzdGVyIjoiUDBBMSIsInByaXZhdGUiOiJleUpqZEhraU9pSktWMVFpTENKbGJtTWlPaUpCTVRJNFEwSkRMVWhUTWpVMklpd2lZV3huSWpvaVpHbHlJbjAuLktyZlhNUXFYTWlaZ2VjNnlJRFk3ekEuTUlIN2k0ZHVQQ0VXaU42dG82X1ZkRmpSNU1GU2ZjbGE1aDlSRXE1dEFEVFByX2NhRTBTcG55UGxPUms4aVZMcU1wanVVUTBDcndpMlVCWkdBeHhLSWVGSldVNmpqZF9CZW1Ya0EzMm9MWk9VeDBUakhoZWcxMDNJSDZDTFl0WUhwTjhHdzlGenNWTjYxc2t4aEVfeEpEb3ZqMTZ2aDFLSkpSbjBZZDQ2VFI4TkhIWlZqRlNrTlAtQ09IUkZmcFBzNWppMDE2eUJHMGxtb2lxSmIwSmRiOHhQdzFIQjN3cUNNTjE5R2NYQjNxbnZJa213SV9lRFNjZkhkWHBvV2Q4NkdsQjdIYjhDRDFJenZPS0ZUSGM0LVM4M3BOcm9xYU9rUkxIVmlTUHp4MlFERVEzNzBqR05DZWQ2elRwTlRyNWJyNVpFd0phZ21Tall6MDdHdjJuYlZmUW5XM0FXMWc3aUdhMWhvZ3dEQnZUX1dPek41LUVwdVEyZzRWaFpFRkgxTGppMTRJVTNuTnNrT05rY1pxNnA5NDB4WmlNMWh4T2k1bkxIbnVDVTR6X3JVSkZTckc4ZjZGSHBRTGNicWJ1QVRDU2dfemNWN2FhcEdzcjNVWnpFamxKYlZ4U3VYRjhqb1AtVk15RFIxbzBKM0NmcnhEZmxKc1NBYkZvYXo1aXEyTlhaUlZWLWhvcjZFOHNrVXk1V3o5RXVvZGFXNHMwR2ZGNENreVdFaTRVNUtTTGR1M0VOemc3M3NvcjcxMHhJeXFvSmNWMUR5dWdHRWNzcEtMbExpZl9EbWNOcDNMcFo3dUNsUnl0RlRwZVBnUEFUWkhEWDk5OGR4cXJ3SlF4RFN1QndkdFNZQXk3aGdNY2xFT3NlcFo5R0ZLdjRjUENEZHd3eFk2VXRwWUpNbHR1TURCTElMQVpfNUZudkgzaGlkcVk5S2VsRjNMNlhCYTdWM0ZQOXV5NGF2aVQybmk5QWxsOThXb1VhTEUtTW45eXN4SEtFdmFnOFIzdno2VWd0Z3lqZHBSU09EVlBqZ3pVN3lNV3ZFXzk0NmJSdWV2dDhUMHF2TFotVTBhMWhxM0xwTzE3MWUyMnBDV1VpNEJxa0FGVGpsMmI2elhsNG9vQjlFZThteXhQT0pSeF8xZlVkbG9GZVgyZXVULVJQcWlHN1c3ZmpWQk95bnFzZENtLTNlZk5rRFVGam1ZVm5pN0lxa3gtLTE4Y3NQcU16VUswdmVieERNNlUtbG53Lk5weXNtTjEzbW1yX0t1VTNIZFpzOHciLCJyZWZlcmVuY2VfaWQiOiJiMDIxMjg4MS01ODAxLTQ3NjctOWZkZC0zNGY1Njc2ZGUwM2MiLCJpc3MiOiJodHRwczovL2lkYnJva2VyLWItdXMud2ViZXguY29tL2lkYiIsInRva2VuX3R5cGUiOiJCZWFyZXIiLCJjbGllbnRfaWQiOiJDNTgyNTRmMzhjZTAwZWM3YWZkMWI2MDY2Zjk3ZTNjMjY4MGY4MTlmYWVmZTY4YTk2NTIxOTdhM2E5ZTE4ODdjNCIsInVzZXJfdHlwZSI6InVzZXIiLCJ0b2tlbl9pZCI6IkFhWjNyMFpHUXdOREpsWW1RdE4yWmlZaTAwWVRCa0xXSmpOakV0TkRZNU16TXpOMkl5TURZeE56bG1NbU5oWVRNdFl6TmkiLCJ1c2VyX21vZGlmeV90aW1lc3RhbXAiOiIyMDI1MDEwNzExNTU0Mi44OTVaIiwicmVhbG0iOiJlNzkyNDY2Ni03NzdkLTQwZDQtYTUwNC0wMWFhMWU2MmRkMmYiLCJjaXNfdXVpZCI6ImJhYzA5MWZmLWQxNWYtNGZjOS1iMDA4LWZhNDJiYTk3MTlmOCIsImV4cGlyeV90aW1lIjoxNzQwNzAyMjYyMjc2fQ.XpXi6YOjMx1i0hwk_T_fFXUnnheIuMsW3iQAtOpnjVrRcJD2cwGGhgf3auxGVy0bzPPR8ou2x3CdMHHAehzvkdU_RT06T-y4FZ06Lit9kWYCzknaZg0zvXphyki4-dfcwFwC9yQE0qevWJldQekW8nXqUcgMD9UPzhU0beP73YcNNR1cgaa_bp3Jq6ybB7BLVGlT_KqsW1P3bPX21MGmVNIzKZb06uuSRz-7dejEQH9r-jmdEMe2G1bStRluKFgNjy_GnNDKit374Z7y6apjZpMgRaM4it-UmK0gEkJ3RCbDWEJyCX1eRNVxR5wnqprOD-Vaia2gajjS31IL8dPqcg"
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
    <ThemeProvider>
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
            <Route path="float" element={<FloatingWindow />}></Route>
            <Route path="sidebar" element={<Sidebar />}></Route>
          </Routes>
        </BrowserRouter>
      </IconProvider>
    </ThemeProvider>
  );
}

export default App;
