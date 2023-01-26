import { IMilk, IMilkRespone } from "type";
import { countAllData, countAllDataSearch, findAllFromSearch, getAllbyDefault, getAllbyPage, getAllbyType, getAllFilteredMilkbyPage, getAllTypes, getDataByID, updateDataByID } from "./db";

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

export const getAllFromSearch = async (search: string, page: string): Promise<IMilkRespone> => {
  const data: IMilk[] = await findAllFromSearch(search, page);
  const numberOfItems: number = await countAllDataSearch(search);
  const types: string[] = await getAllTypes();
  return (await { data: data, numberOfItems: numberOfItems, types: types })
}

export const getDataById = async (id: string | undefined): Promise<IMilk> => {
  const uuidRegex: RegExp = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  if (id && uuidRegex.test(id)) {
    return await getDataByID(id);
  } else {
    throw new Error("bad request");
  }
};

export const updateDatabyId = async (id: string | undefined, quantity: string): Promise<IMilk> => {
  const uuidRegex: RegExp = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  if (id && uuidRegex.test(id)) {
    return await updateDataByID(id, quantity);
  } else {
    throw new Error("bad request");
  }
}; 