// model link {
//     id          Int      @id @default(autoincrement())
//     url         String
//     slug        String   @unique
//     description String?
//     createdAt   DateTime @default(now())
//     creator     String

import type { StringMappingType } from "typescript"

//     @@index(slug)
//   }


export declare type Link = {
    id: number,
    url: string,
    slug: string,
    description: string | null,
    createdAt: Date,
    creator: string
} 