import raw from "../data/resources.json";

export type Category = 
    | "Podcasts" 
    | "Articles" 
    | "Newsletters" 
    | "Recipes" 
    | "Fitness" 
    | "Meditation";

export interface Resource {
    id: string;
    category: Category;
    title: string;
    thumbnail: string;
    tags: string[];
    duration: number;
    description: string;
    date_uploaded?: string;
}

const resources: Resource[] = raw as Resource[];

export const fetchResources = async (): Promise<Resource[]> => {
    
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(resources);
        }, 500);
    });
};