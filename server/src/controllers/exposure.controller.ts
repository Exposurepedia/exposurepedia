/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * All the controller functions containing the logic for routes relating to
 * exposure items.
 */
import express from 'express';
import ApiError from '../util/apiError';
import StatusCode from '../util/statusCode';
import {
  getExposureItemFromDB,
  deleteExposureItemFromDB,
  createExposureItemInDB,
  getAllDisorderItemsFromDB,
  getAllFormatItemsFromDB,
  getAllInterventionTypeItemsFromDB,
  getAllKeywordItemsFromDB,
  getFilteredExposureItemsFromDB,
} from '../services/exposure.service';
import { Disorder } from '../models/disorder.model';
import { ExposureItem } from '../models/exposureItem.model';
import { Format } from '../models/format.model';
import { InterventionType } from '../models/interventionType.model';
import { Keyword } from '../models/keyword.model';

/**
 * Gets all disorders.
 */
const getAllDisorders = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  getAllDisorderItemsFromDB()
    .then((items) => {
      res.status(StatusCode.OK).send(items);
    })
    .catch(() => {
      next(ApiError.internal('Unable to retrieve disorder items'));
    });
};

const getAllKeywords = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  getAllKeywordItemsFromDB()
    .then((items) => {
      res.status(StatusCode.OK).send(items);
    })
    .catch(() => {
      next(ApiError.internal('Unable to retrieve keyword items'));
    });
};

const getAllInterventionTypes = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  getAllInterventionTypeItemsFromDB()
    .then((items) => {
      res.status(StatusCode.OK).send(items);
    })
    .catch(() => {
      next(ApiError.internal('Unable to retrieve intervention type items'));
    });
};

const getAllFormats = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  getAllFormatItemsFromDB()
    .then((items) => {
      res.status(StatusCode.OK).send(items);
    })
    .catch(() => {
      next(ApiError.internal('Unable to retrieve format items'));
    });
};

const getFilterOptions = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  let disorderObj: any = {};
  const disorders1 = await Disorder.find({ parent: null, approved: true })
    .sort({ name: 1 })
    .exec();
  for (const disorder of disorders1) {
    if (disorder.subdisorders && disorder.subdisorders.length === 0) {
      // no subdisorders
      disorderObj[disorder.name] = false;
    } else {
      // level 2 subdisorders exist
      disorderObj[disorder.name] = {};
      const disorder2Ids = disorder.subdisorders;
      for (const id2 of disorder2Ids) {
        const dis2 = await Disorder.findOne({
          _id: id2,
        }).exec();
        if (!dis2 || !dis2.approved) continue;
        if (dis2.subdisorders && dis2.subdisorders.length === 0) {
          disorderObj[disorder.name][dis2.name] = false;
        } else {
          disorderObj[disorder.name][dis2.name] = {};
          const disorder3Ids = dis2.subdisorders;
          for (const id3 of disorder3Ids) {
            const dis3 = await Disorder.findOne({
              _id: id3,
            }).exec();
            if (!dis3 || !dis3.approved) continue;
            if (dis3.subdisorders && dis3.subdisorders.length === 0) {
              disorderObj[disorder.name][dis2.name][dis3.name] = false;
            } else {
              disorderObj[disorder.name][dis2.name][dis3.name] = {};
              const disorder4Ids = dis3.subdisorders;
              for (const id4 of disorder4Ids) {
                const dis4 = await Disorder.findOne({
                  _id: id4,
                }).exec();
                if (!dis4 || !dis4.approved) continue;
                disorderObj[disorder.name][dis2.name][dis3.name][dis4.name] =
                  false;
              }
            }
          }
        }
      }
    }
  }

  const sortKeys = (obj: any, newObj: any) => {
    Object.keys(obj)
      .sort()
      .forEach((key) => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          const newObj2 = {};
          // eslint-disable-next-line no-param-reassign
          newObj[key] = sortKeys(obj[key], newObj2);
        } else {
          // eslint-disable-next-line no-param-reassign
          newObj[key] = obj[key];
        }
      });
    return newObj;
  };
  const sortedDisorderObj = sortKeys(disorderObj, {});

  const formats = await Format.distinct('name').exec();
  let formatObj: any = {};
  formats.forEach((format: string) => {
    formatObj[format] = false;
  });
  const sortedFormatObj = sortKeys(formatObj, {});

  const interventionTypes = await InterventionType.distinct('name').exec();
  let intTypeObj: any = {};
  interventionTypes.forEach((intType: string) => {
    intTypeObj[intType] = false;
  });
  const sortedIntTypeObj = sortKeys(intTypeObj, {});

  const filterOptions = {
    Disorder: sortedDisorderObj,
    Format: sortedFormatObj,
    'Intervention Type': sortedIntTypeObj,
    'Adult/Child Friendly': {
      'Child Friendly': false,
      'Adult Friendly': false,
    },
  };
  res.status(StatusCode.OK).send(filterOptions);
};

/**
 * Gets exposure items by given filter. Upon success, returns the items with 200 OK status code.
 */
const getFilteredExposureItems = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const {
    disorders,
    formats,
    interventionTypes,
    isAdultAppropriate,
    isChildAppropriate,
    isLinkBroken,
    isApproved,
    query,
    sortColumn,
    sortDirection,
  } = req.body;

  if (
    disorders == null ||
    formats == null ||
    interventionTypes == null ||
    isAdultAppropriate == null ||
    isChildAppropriate == null ||
    isLinkBroken == null ||
    isApproved == null
  ) {
    next(
      ApiError.missingFields([
        'disorders',
        'formats',
        'interventionTypes',
        'isAdultAppropriate',
        'isChildAppropriate',
        'isLinkBroken',
        'isApproved',
        'query',
      ]),
    );
    return;
  }

  try {
    const exposureItems = await getFilteredExposureItemsFromDB(
      disorders,
      formats,
      interventionTypes,
      isAdultAppropriate,
      isChildAppropriate,
      isLinkBroken,
      isApproved,
      query,
      sortColumn,
      sortDirection,
    );
    res.status(StatusCode.OK).json(exposureItems);
  } catch (err) {
    next(ApiError.internal('Unable to retrieve exposure items'));
  }
};

/**
 * Gets exposure item by id. Upon success, returns the item with 200 OK status code.
 */
const getExposureItemByID = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const id = req.params.exposure_id;
  getExposureItemFromDB(id)
    .then((item) => {
      res.status(StatusCode.OK).send(item);
    })
    .catch(() => {
      next(ApiError.internal('Unable to retrieve exposure item'));
    });
};

/**
 * Creates the new item. Upon success, returns 200 OK status code.
 */
const postExposureItemInDB = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const item = req.body;
  if (
    item.name == null ||
    item.disorder1 == null ||
    item.formats == null ||
    item.interventionTypes == null ||
    item.isAdultAppropriate == null ||
    item.isChildAppropriate == null
  ) {
    next(
      ApiError.missingFields([
        'name',
        'disorder1',
        'formats',
        'interventionTypes',
        'isAdultAppropriate',
        'isChildAppropriate',
      ]),
    );
    return;
  }
  if (item.disorder2 == null) {
    item.disorder2 = [];
  }
  if (item.disorder3 == null) {
    item.disorder3 = [];
  }
  if (item.disorder4 == null) {
    item.disorder4 = [];
  }
  if (item.keywords == null) {
    item.keywords = [];
  }
  if (item.modifications == null) {
    item.modifications = '';
  }
  if (item.link == null) {
    item.link = '';
  }
  if (item.isAdminUpload == null) {
    item.isAdminUpload = false;
  }

  try {
    const exposureItem = await createExposureItemInDB(
      item.name,
      item.disorder1,
      item.disorder2,
      item.disorder3,
      item.disorder4,
      item.formats,
      item.interventionTypes,
      item.isAdultAppropriate,
      item.isChildAppropriate,
      item.keywords,
      item.modifications,
      item.link,
      item.isAdminUpload,
    );
    res.status(StatusCode.OK).json(exposureItem);
  } catch (err) {
    next(ApiError.internal('Unable to create exposure item'));
  }
};

/**
 * Updates exposure item by id. Upon success, returns 200 OK status code.
 */
// TODO: update parent disorders if something is being marked as approved
const patchExposureItemByID = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const id = req.params.exposure_id;
  const updatedItem = req.body;
  if (!id) {
    next(ApiError.missingFields(['exposureitem_id']));
    return;
  }

  const exposureItem = await ExposureItem.findOne({
    _id: id,
  }).exec();
  if (!exposureItem) {
    throw new Error('Invalid exposure item');
  }

  if (updatedItem.disorders !== undefined) {
    const newDisorders = await Disorder.find({
      name: { $in: updatedItem.disorders },
    }).exec();
    exposureItem.disorders = newDisorders;
  }
  if (updatedItem.formats !== undefined) {
    const newFormats = await Format.find({
      name: { $in: updatedItem.formats },
    }).exec();
    exposureItem.formats = newFormats;
  }
  if (updatedItem.interventionTypes !== undefined) {
    const newInterventionTypes = await InterventionType.find({
      name: { $in: updatedItem.interventionTypes },
    }).exec();
    exposureItem.interventionTypes = newInterventionTypes;
  }
  if (updatedItem.keywords !== undefined) {
    updatedItem.keywords.forEach(async (keyword: string) => {
      await Keyword.updateOne(
        { name: keyword },
        { name: keyword },
        { upsert: true },
      ).exec();
    });
    const newKeywords = await Keyword.find({
      name: { $in: updatedItem.keywords },
    }).exec();
    exposureItem.keywords = newKeywords;
  }

  if (updatedItem.name !== undefined) exposureItem.name = updatedItem.name;
  if (updatedItem.isAdultAppropriate !== undefined)
    exposureItem.isAdultAppropriate = updatedItem.isAdultAppropriate;
  if (updatedItem.isChildAppropriate !== undefined)
    exposureItem.isChildAppropriate = updatedItem.isChildAppropriate;
  if (updatedItem.link !== undefined) exposureItem.link = updatedItem.link;
  if (updatedItem.modifications !== undefined)
    exposureItem.modifications = updatedItem.modifications;
  if (updatedItem.isLinkBroken !== undefined)
    exposureItem.isLinkBroken = updatedItem.isLinkBroken;
  if (updatedItem.isApproved !== undefined) {
    exposureItem.isApproved = updatedItem.isApproved;
    if (updatedItem.isApproved === true) {
      // update disorders (including parents), formats, intervention types, and keywords to be approved
      exposureItem.disorders.forEach(async (disorderId) => {
        const disorder2 = await Disorder.findOneAndUpdate(
          { _id: disorderId },
          { approved: true },
          { new: true, upsert: true },
        ).exec();
        if (disorder2 && disorder2.parent) {
          const disorder3 = await Disorder.findOneAndUpdate(
            { _id: disorder2.parent },
            { approved: true },
            { new: true, upsert: true },
          ).exec();
          if (disorder3 && disorder3.parent) {
            const disorder4 = await Disorder.findOneAndUpdate(
              { _id: disorder3.parent },
              { approved: true },
              { new: true, upsert: true },
            ).exec();
            if (disorder4 && disorder4.parent) {
              const disorder5 = await Disorder.findOneAndUpdate(
                { _id: disorder4.parent },
                { approved: true },
                { new: true, upsert: true },
              ).exec();
            }
          }
        }
      });
      exposureItem.formats.forEach(async (formatId) => {
        await Format.findOneAndUpdate(
          { _id: formatId },
          { approved: true },
          { new: true, upsert: true },
        ).exec();
      });
      exposureItem.interventionTypes.forEach(async (intTypeId) => {
        await InterventionType.findOneAndUpdate(
          { _id: intTypeId },
          { approved: true },
          { new: true, upsert: true },
        ).exec();
      });
      exposureItem.keywords.forEach(async (keywordId) => {
        await Keyword.findOneAndUpdate(
          { _id: keywordId },
          { approved: true },
          { new: true, upsert: true },
        ).exec();
      });
    }
  }

  try {
    await exposureItem.save();
    res.sendStatus(StatusCode.OK);
  } catch (err) {
    next(ApiError.internal('Unable to update the exposure item'));
  }
};

/**
 * Deletes exposure item by id. Upon success, returns 200 OK status code.
 */
const deleteExposureItemByID = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const id = req.params.exposure_id;
  deleteExposureItemFromDB(id)
    .then(() => {
      res.sendStatus(StatusCode.OK);
    })
    .catch(() => {
      next(ApiError.internal('Unable to delete exposure item'));
    });
};

export {
  getExposureItemByID,
  getAllDisorders,
  getAllKeywords,
  getAllInterventionTypes,
  getAllFormats,
  getFilterOptions,
  getFilteredExposureItems,
  patchExposureItemByID,
  deleteExposureItemByID,
  postExposureItemInDB,
};
