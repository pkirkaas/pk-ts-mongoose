/**
 * Enhance Mongoose as I like it.
 * Import PkSchema & MkModel instead of mongoose.Schema & mongoose.Model
 * NOTE: Derived from previous implementations - need to be updated
 */

import mongoose from 'mongoose';
import { ObjectId } from "mongodb";
import { add, isValid, parse, toDate } from "date-fns";
import * as _ from "lodash";

import {
  typeOf, isEmpty, filterInt, isPromise,
  GenObj,
  isSimpleObject, validateDateFnsDuration,
} from "pk-ts-node-lib";

// What replaces errLog, throwLog,consoleError, ?

/**
 * Extends Mongoose.schema with additional convenient defaults opts, fields & methods 
 */
export class PkSchema extends mongoose.Schema {
  constructor(tmplt: any, opts: any = {}) {
    let defaultOpts = { //Add default opts
      timestamps: true,
    };

    let defaultTmplt: any = {
      settings: {}, // All derived models/schemas support arbitray settings data not in schema
    };
    tmplt = { ...defaultTmplt, ...tmplt };
    opts = { ...defaultOpts, ...opts }; // Add default opts to opts unless overridden
    super(tmplt, opts);

    /*
  let defaultObj = {
    settings: {}, // Any OTH model can have custom settings
    _tstVer: {}, // Enables definition of fake/test data/objects
    createDt: { type: Date, default: new Date() },
    updateDt: { type: Date },
  };
  */

    // Add common methods


    this.methods.getConnectionString = function () {
      return this.db._connectionString;
    };

    this.statics.getConnectionString = function () {
      //@ts-ignore
      return this.db._connectionString;
    };


    this.methods.getModelClass = function () {
      return this.constructor;
    };


   //############################  START  Model Static Methods
    //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

    this.statics.getModel = function () {
      return this.modelName;
    };


    this.statics.getKeys = function () {
      //@ts-ignore
      return Object.keys(this.schema.tree);
    };
    this.statics.isa = function (doc) {
      /*
      if (typeof doc === 'string') {
      }
      */
      if (doc instanceof this) {
        return doc;
      }
      return false;
    };

    this.statics.getId = function (doc, doThrow = true) {
      if (typeof doc === "string") {
        return doc;
      }
      if (doc instanceof this) {
        return doc.id;
      }
      /*
      if (doThrow) {
        throwLog(errMsg);
      }
      */
    };








  } // END overrided constructor

}














