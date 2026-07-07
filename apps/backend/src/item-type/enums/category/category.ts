export enum Category {
    INVESTING = 'investing',
    FINANCING = 'financing',
    OPERATING = 'operating',
}

export const CategoryLabels: Record<Category, string> = {
    [Category.INVESTING]: 'Investing',
    [Category.FINANCING]: 'Financing',
    [Category.OPERATING]: 'Operating',
}
