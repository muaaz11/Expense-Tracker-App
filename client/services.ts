import { cloudinary_upload_presets, cloudinary_app, cloudinary_api_url } from "./url";

// const CLOUDINARY_API_URL =`https://api.cloudinary.com/v1_1/drulfjzxz/image/upload`;

// export const uploadToCloudinary = async (
//   file: { uri?: string } | string,
//   folderName: string,
// ) => {
//   try {
//     if (typeof file === "string") {
//       return;
//     }

//     if (file && file.uri) {
//       const formData = new FormData();

//       formData.append("file", {
//         uri: file.uri,
//         type: "image/jpeg",
//         name: folderName,
//       } as any);

//       formData.append("upload_preset", cloudinary_upload_presets || "");
//       formData.append("cloud_name", cloudinary_app || "");

//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/drulfjzxz/image/upload`,
//         {
//           method: "POST",
//           body: formData,
//         },
//       );

//       const result = await response.json();
//       if (!result.secure_url) {
//         console.log("UPLOAD FAILED:", result);
//         return null;
//       }
//       return { data: result.secure_url };
//     }
//   } catch (error) {
//     console.log("UPLOAD ERROR:", error);
//     return null;
//   }
// };

export const getProfileImage = (file: any) => {
  if (file && typeof file == "string") return file;
  if (file && typeof file == "object") return file.uri;

  return file;
};

export const getFilePath = (file: any) => {
  if (file && typeof file == "string") return file;
  if (file && typeof file == "object") return file.uri;

  return null;
};
