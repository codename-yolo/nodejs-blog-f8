import { Schema, model, plugin } from 'mongoose';

import slug from 'mongoose-slug-updater';

import softDelete from 'mongoose-delete';

import { RequestType } from '../type';

// Có 2 cách add plugin là add trực tiếp vào mongoose hoặc là add vào schema
// Cách 1 plugin(slug);
// Cách 2 coursesSchema.plugin(slug)

plugin(slug);
plugin(softDelete, { overrideMethods: "all", deletedAt: true});

const coursesSchema = new Schema(
    {
        name: { type: String, maxLength: 255, require: true },
        description: { type: String, maxLength: 600 },
        image: { type: String, maxLength: 255, require: true },
        videoId: { type: String, maxLength: 255, require: true },
        level: { type: String, maxLength: 255 },
        slug: { type: String, slug: "name", unique: true},
    },
    {
        timestamps: true,
    },
);

// Custom query helpers
// (coursesSchema.statics as Record<string, any>).sortable = function(req: any) {
//     if(req.query.hasOwnProperty('_sort')){
//         const isValidType = ['desc','asc'].includes(req.query.type)

//         return this.find().sort({
//             [req.query.column] : isValidType ? req.query.type : 'desc'
//         })
//     }

//     return this
// }

// Custom Query Method
coursesSchema.statics.findByName = function(name: string) {
    return this.findOne({ name });
  };

const CoursesModel: any = model('Courses', coursesSchema);

export default CoursesModel;
