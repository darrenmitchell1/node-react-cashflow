export enum Frequency {
    SINGLE = 'single',
    DAILY = 'daily',
    WEEKLY = 'weekly',
    MONTHLY = 'monthly',
}

export const FrequencyLabels: Record<Frequency, string> = {
    [Frequency.SINGLE]: 'Monthky',
    [Frequency.DAILY]: 'Daily',
    [Frequency.WEEKLY]: 'Weekly',
    [Frequency.MONTHLY]: 'Monthly',
}
