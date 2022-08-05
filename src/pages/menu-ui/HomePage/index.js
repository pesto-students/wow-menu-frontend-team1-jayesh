import Header from "./Header";
import IconSet from "./IconSet";
import Slider from "./Slider";
import Menu from "./Menu";
import ActionCards from "./ActionCards";

function HomePage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-light-base1 dark:bg-dark-base1">
      <div className="h-full p-4 overflow-y-auto bg-lightPattern">
        <div className="flex items-center justify-between">
          <Header />
          <IconSet />
        </div>
        <Slider />
        <Menu />
      </div>
      <ActionCards />
    </div>
  );
}

export default HomePage;
