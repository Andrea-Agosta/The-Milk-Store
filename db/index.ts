import { IMilk, IMilkRespone } from "type";
import { countAllData, getAllbyDefault, getAllTypes } from "./db";

export const getAllMilks = async (): Promise<IMilkRespone> => {
  const data: IMilk[] = await getAllbyDefault();
  const numberOfItems: number = await countAllData();
  const types: string[] = await getAllTypes();
  return (await { data: data, numberOfItems: numberOfItems, types: types })
};

// export const getAll = async (type: string, page: string): Promise<IMilk[]> => {
//   if (type && page) {
//     return getAllFilteredMilkbyPage(type, page);
//   };
//   if (!type && page) {
//     return getAllbyPage(page);
//   };
//   if (type && !page) {
//     return getAllbyType(type);
//   };
//   return getAllbyDefault();
// }
