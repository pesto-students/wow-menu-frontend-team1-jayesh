import { motion } from "framer-motion";
import Header from "./Header";
import Slider from "./Slider";
import Menu from "./Menu";
import ActionCards from "./ActionCards";

function HomePage() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-full p-4 overflow-x-hidden overflow-y-auto customer bg-lightPattern"
      >
        <Header />
        <Slider />
        <Menu />
      </motion.div>
      <ActionCards />
    </>
  );
}

export default HomePage;
