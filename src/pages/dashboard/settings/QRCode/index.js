import Swal from "sweetalert2";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { QRCodeSVG } from "qrcode.react";
import BackButton from "../../../../shared/components/BackButton";
import Button from "../../../../shared/components/Button";
import RestaurantService from "../../../../services/restaurant";
import { setRestaurant } from "../../../../store/reducers/restaurantReducer";

export default function QRCode() {
  const dispatch = useDispatch();
  const restaurantId = useSelector((state) => state.restaurant.details.id);
  const tables = useSelector((state) => state.restaurant.details.totalTables);
  const { loading, response, updateRestaurant } = RestaurantService();
  const urls = [];
  for (let i = 0; i < tables; i += 1) {
    urls.push(`${restaurantId}/${i + 1}`);
  }
  const downloadQRCode = async (idx) => {
    const svg = document.getElementById(`Table${idx}`);
    let svgData;
    if (svg) {
      svgData = new XMLSerializer().serializeToString(svg);
    }
    // eslint-disable-next-line
    const doc = new jsPDF();
    doc.setFontSize(40);
    doc.text("WOW Menu", 65, 30);
    await doc.addSvgAsImage(svgData, 40, 50, 128, 128, "SLOW");
    doc.text(`Table ${idx + 1}`, 80, 185);
    doc.save(`Table ${idx + 1}`);
  };

  const handleAddTable = () => {
    updateRestaurant(restaurantId, { totalTables: tables + 1 });
  };
  const handleRemoveTable = () => {
    if (tables === 1) {
      Swal.fire({
        text: "Atleast 1 table need to be present",
        icon: "error",
        confirmButtonColor: "#EA7C69",
      });
      return;
    }
    updateRestaurant(restaurantId, { totalTables: tables - 1 });
  };

  useEffect(() => {
    if (response && response.data) {
      dispatch(setRestaurant(response.data));
    }
  }, [response]);

  return (
    <motion.main
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-screen h-screen p-4 overflow-x-hidden pl-28"
    >
      <header>
        <div className="flex items-center">
          <BackButton href="/dashboard/settings" />
          <h1 className="ml-2 text-3xl font-semibold leading-loose text-light-text1 dark:text-dark-text1">
            QR Code
          </h1>
        </div>
      </header>
      <nav className="w-full text-light-text1 dark:text-dark-text1">
        <ol className="flex">
          <li>
            <Link to="/dashboard/settings" className="hover:text-primary">
              Settings
            </Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li className="text-light-text2 dark:text-dark-text2">QR Codes</li>
        </ol>
      </nav>
      <hr className="mt-3 mb-4 border-gray-400 dark:border-gray-600" />
      <div className="flex justify-end mb-4">
        <Button className="mr-2" onClick={handleAddTable} disabled={loading}>
          Add Table
        </Button>
        <Button onClick={handleRemoveTable} disabled={loading}>
          Remove Table
        </Button>
      </div>
      <div className="grid gap-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        {urls.map((url, idx) => {
          return (
            <motion.div key={url} className="flex justify-center">
              <div className="relative p-6 border border-gray-300 rounded md:p-12 dark:border-gray-700 bg-light-base3 dark:bg-dark-base2 border-1">
                <div className="flex justify-center">
                  <QRCodeSVG
                    id={`Table${idx}`}
                    value={`${
                      process.env.NODE_ENV === "development"
                        ? "http://localhost:3000/"
                        : "https://wow-menu.netlify.app/"
                    }${url}`}
                    size={128}
                    level="L"
                    includeMargin
                  />
                </div>
                <a
                  href={`${
                    process.env.NODE_ENV === "development"
                      ? "http://localhost:3000/"
                      : "https://wow-menu.netlify.app/"
                  }${url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline hover:underline-offset-2"
                >
                  <p className="mt-2 text-xs text-center break-all">{`${
                    process.env.NODE_ENV === "development"
                      ? "http://localhost:3000/"
                      : "https://wow-menu.netlify.app/"
                  }${url}`}</p>
                </a>
                <p className="mt-2 mb-5 text-lg font-medium text-center text-light-text1 dark:text-dark-text1">{`Table ${
                  idx + 1
                }`}</p>
                <button
                  type="button"
                  onClick={() => downloadQRCode(idx)}
                  className="absolute inset-x-0 bottom-0 flex items-center justify-center py-2 mx-auto text-center rounded-b bg-primary/30 text-primary"
                >
                  <AiOutlineCloudDownload className="text-2xl" />
                  <span className="ml-2">Download</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.main>
  );
}
