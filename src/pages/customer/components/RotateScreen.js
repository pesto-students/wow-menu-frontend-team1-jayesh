import { motion, AnimatePresence } from "framer-motion";
import darkPhone from "../../../assets/images/rotatePhoneDark.png";
import lightPhone from "../../../assets/images/rotatePhoneLight.png";
import useDarkMode from "../../../shared/hooks/useDarkMode";

function RotateScreen() {
  const [darkMode] = useDarkMode();
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative w-screen h-screen overflow-hidden landscape bg-light-base1 dark:bg-dark-base1 bg-lightPattern"
      >
        <div className="grid grid-cols-2 gap-1">
          {darkMode ? (
            <img src={lightPhone} alt="" className="w-5/6 mx-auto" />
          ) : (
            <img src={darkPhone} alt="" className="w-5/6 mx-auto" />
          )}
          <div className="flex items-center">
            <div className="text-center">
              <p className="text-lg font-semibold text-light-text1 dark:text-dark-text1">
                ROTATE YOUR DEVICE
              </p>
              <p className="mt-4 text-sm text-light-text1 dark:text-dark-text1">
                We do not support landscape mode yet. Please go back to portrait
                mode for the best experience
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default RotateScreen;
