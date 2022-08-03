import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AnimatedRoutes from "./shared/components/AnimatedRoutes";
import useDarkMode from "./shared/hooks/useDarkMode";

function App() {
  const [darkMode] = useDarkMode();
  return (
    <BrowserRouter>
      <AnimatedRoutes clasName={`${darkMode}?'dark':''`} />
    </BrowserRouter>
  );
}

export default App;
