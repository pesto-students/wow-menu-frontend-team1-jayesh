import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";
import IconSet from "./IconSet";
import Slider from "./Slider";
import Menu from "./Menu";
import ActionCards from "./ActionCards";
import useInit from "../useInit";
import RotateScreen from "../components/RotateScreen";
import useScreenOrientation from "../../../shared/hooks/useScreenOrientation";

function HomePage() {
  useInit();
  const orientation = useScreenOrientation();
  return (
    <AnimatePresence exitBeforeEnter>
      {orientation !== 0 ? (
        <RotateScreen />
      ) : (
        <div className="relative w-screen h-screen overflow-hidden bg-light-base1 dark:bg-dark-base1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.5, transition: { duration: 0.1 } }}
            className="h-full p-4 overflow-x-hidden overflow-y-auto bg-lightPattern"
          >
            <div className="flex items-center justify-between">
              <Header />
              <IconSet />
            </div>
            <Slider />
            <Menu />
          </motion.div>
          <ActionCards />
        </div>
      )}
    </AnimatePresence>
  );
}

export default HomePage;
