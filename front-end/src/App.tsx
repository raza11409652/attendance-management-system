import { AppRoutes } from "./routes";
import { ConfigProvider } from "antd";
import "./assets/app.css";
import { Provider } from "react-redux";
import { store } from "./slice";
function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          // algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: "#004385",
            colorWarning: "#FAAD14",
            colorInfo: "#1e91d6",
            borderRadius: 4,
            fontFamily: `"Montserrat", sans-serif`,
          },
        }}
      >
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </ConfigProvider>
    </>
  );
}

export default App;
