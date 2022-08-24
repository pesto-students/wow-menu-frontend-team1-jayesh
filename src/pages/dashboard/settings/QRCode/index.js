import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { QRCodeSVG } from "qrcode.react";

export default function AccessManagement() {
  // const restaurantId = useSelector((state) => state.restaurant.id);
  // const tables = useSelector((state) => state.restaurant.details.tableNo);
  const restaurantId = "62f125ea334c342911733c7e";
  const tables = 7;
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

  return (
    <motion.main
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-screen h-screen p-4 overflow-hidden pl-28"
    >
      <header>
        <h1 className="text-3xl font-semibold leading-loose text-light-text1 dark:text-dark-text1">
          QR Code
        </h1>
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
          <li>QR Codes</li>
        </ol>
      </nav>
      <hr className="mt-3 mb-8 border-gray-700 dark:border-gray-600" />
      <div className="grid gap-8 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        {urls.map((url, idx) => {
          return (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.25 }}
              key={url}
              className="flex justify-center"
            >
              <div className="relative p-12 border border-gray-400 rounded dark:border-gray-700 border-1 ">
                <a
                  href={`https://wow-menu.netlify.app/${url}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <QRCodeSVG
                    id={`Table${idx}`}
                    value={`https://wow-menu.netlify.app/${url}`}
                    size={128}
                    level="L"
                    includeMargin
                  />
                </a>
                <p className="my-5 text-lg font-medium text-center text-light-text1 dark:text-dark-text1">{`Table ${
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