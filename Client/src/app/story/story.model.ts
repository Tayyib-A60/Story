export interface Story {
        storyId: number,
        userId: number,
        summary: string,
        description: string,
        type: string,
        taskComplexity: Complexity,
        estimatedTime: number,
        cost: number,
        reviewerId: number,
        approved: boolean,
        reviewedByAdmin: boolean,
        adminComment: string
}

export enum Complexity
{
    Easy,
    Medium, 
    Hard
}