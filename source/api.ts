export interface Target {
    type: string;
    currentSum: number;
    finishTime: any;
    createdAt: number;
    id: number;
    bloggerId: number;
    targetSum: number;
    bloggerUrl: string;
    priority: number;
    description: string;
}

/**
 * Fetch target from boosty.to
 * @param id  Target id
 * @param currency Currency to fetch target in
 * @returns 
 */
export async function getTarget(id: number, currency: "USD"|"RUB" = "USD"): Promise<Target> {
    let result = await fetch(`https://api.boosty.to/v1/target/${id}?currency=${currency}`);
    if (result.status === 200) {
        return await result.json();
    }
    throw new Error("Error fetching target");
}