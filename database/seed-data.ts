

interface SeedData {
    entries: SeedEntry[]
}

interface SeedEntry{
    description: string;
    status: string;
    createdAt: number
}

export const seedData:SeedData = {
    entries: [
        {
            
            description: "Pendiente: Lorem ipsum dolor sit amet",
            status: "pending",
            createdAt: Date.now(),
        },
        {
            
            description: "En progreso: Lorem ipsum dolor sit amet",
            status: "in-progress",
            createdAt: Date.now() - 1000000,
        },
        {
           
            description: "Finalizadas: Lorem ipsum dolor sit amet",
            status: "finished",
            createdAt: Date.now() - 100000,
        }
    ],


    
}