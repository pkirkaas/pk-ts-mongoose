/**
 * Main entry point for Pk-Ts-Mongoose library
 */

import mongoose from 'mongoose';
export * from './init.js';
import {PkSchema} from './init.js';

let lcs=process.env.LOCAL_CONNECTION_STRING;

await mongoose.connect(lcs);

//const tstSchema = new mongoose.Schema({
const tstSchema = new PkSchema({
  name: String,
  age: Number,
});

const Tst = mongoose.model('Tst', tstSchema);
let tst1 = new Tst({name:"Jackie", age:44, settings:{a:"setting1", b:"setting2"}});
await tst1.save();

let tst2 = new Tst({name:"Susie", age:55});
await tst2.save();

console.log('Pk-Ts-Mongoose ???', lcs);