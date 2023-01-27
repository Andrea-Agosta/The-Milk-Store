import { IMilk, IMilkRespone, IQuery } from "type";
import { Request } from 'express';
import { countAll, getAll, getAllTypes, getDataByID, updateDataByID } from "./db";

export const getAllMilks = async (req: Request<{}, {}, {}, IQuery>): Promise<IMilkRespone> => {
  const data: IMilk[] = await getAll(req);
  const numberOfItems: number = await countAll(req);
  const types: string[] = await getAllTypes();
  return (await { data: data, numberOfItems: numberOfItems, types: types })
};

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