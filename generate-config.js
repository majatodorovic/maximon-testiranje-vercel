// const fs = require("fs");
// const { get } = require("./api/api-settings");
//
// const getBanners = async () => {
//   try {
//     const res = await get("/banners/index_slider");
//     return res ? res.payload : null;
//   } catch (error) {
//     console.error("Error fetching banners:", error);
//     return null;
//   }
// };
//
// const setData = async () => {
//   const data = await getBanners();
//   if (data) {
//     try {
//       if (!fs.existsSync("config")) {
//         fs.mkdirSync("config", { recursive: true });
//       }
//
//       const filePath = "config/project_settings.json";
//       if (fs.existsSync(filePath)) {
//         fs.rmSync(filePath);
//       }
//
//       fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
//       console.log("Data successfully written to project_settings.json");
//     } catch (error) {
//       console.error("Error writing to file:", error);
//     }
//   } else {
//     console.log("No data to write.");
//   }
// };
//
// setData();
//
//
