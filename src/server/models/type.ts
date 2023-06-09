import { Document } from 'mongoose';

export interface CoursesModelType extends Document {
    name: string;
    description?: string;
    image: string;
    videoId: string;
    level?: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}
