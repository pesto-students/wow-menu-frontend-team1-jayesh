import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AnimatedRoutes from "./routes/AnimatedRoutes";
import useDarkMode from "./shared/hooks/useDarkMode";

function App() {
  const [darkMode] = useDarkMode();
  return (
    <BrowserRouter>
      <ToastContainer newestOnTop />
      <AnimatedRoutes clasName={`${darkMode}?'dark':''`} />
    </BrowserRouter>
  );
}

export default App;
