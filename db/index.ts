import { IMilk, IMilkRespone } from "type";
import { countAllData, getAllbyDefault, getAllbyPage, getAllbyType, getAllFilteredMilkbyPage, getAllTypes } from "./db";

export const getAllMilks = async (): Promise<IMilkRespone> => {
  const data: IMilk[] = await getAllbyDefault();
  const numberOfItems: number = await countAllData(null);
  const types: string[] = await getAllTypes();
  return (await { data: data, numberOfItems: numberOfItems, types: types })
};

export const getAll = async (type: string, page: string): Promise<IMilkRespone> => {
  if (type && page) {
    const data: IMilk[] = await getAllFilteredMilkbyPage(type, page);
    const numberOfItems: number = await countAllData(type);
    const types: string[] = await getAllTypes();
    return (await { data: data, numberOfItems: numberOfItems, types: types })
  };
  if (!type && page) {
    const data: IMilk[] = await getAllbyPage(page);
    const numberOfItems: number = await countAllData(null);
    const types: string[] = await getAllTypes();
    return (await { data: data, numberOfItems: numberOfItems, types: types })
  };
  if (type && !page) {
    const data: IMilk[] = await getAllbyType(type);
    const numberOfItems: number = await countAllData(type);
    const types: string[] = await getAllTypes();
    return (await { data: data, numberOfItems: numberOfItems, types: types })
  };
  return getAllMilks();
}
