/**
 * Defines the Disorder model for the database and also the interface to
 * access the model in TypeScript.
 */
import mongoose, { Schema } from 'mongoose';

const DisorderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subdisorders: [{ type: Schema.Types.ObjectId, ref: 'Disorder' }], // doesn't seem like you can create optional arrays
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Disorder',
    required: false,
  },
  approved: {
    type: Boolean,
    required: true,
  },
});

interface IDisorder extends mongoose.Document {
  _id: string;
  name: string;
  subdisorders: IDisorder[];
  parent: IDisorder;
  approved: boolean;
}

const Disorder = mongoose.model<IDisorder>('Disorder', DisorderSchema);

export { IDisorder, Disorder };
