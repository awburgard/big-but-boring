import { roundDownToNearestFive } from './roundDownToNearestFive'

// Define types for the percentage object and week map
type SetPercentages = {
  first: number
  second: number
  third: number
}

type WeekMap = {
  [key: string]: number
}

// Define the percentage data for each week
const PERCENTAGES_BY_WEEK: SetPercentages[] = [
  { first: 0.65, second: 0.75, third: 0.85 }, // Week 1
  { first: 0.7, second: 0.8, third: 0.9 }, // Week 2
  { first: 0.75, second: 0.85, third: 0.95 }, // Week 3
  { first: 0.4, second: 0.5, third: 0.6 }, // Week 4
]

// Define the week map with week names and their indices
const WEEK_MAP: WeekMap = {
  'week-one': 0,
  'week-two': 1,
  'week-three': 2,
  'week-four': 3,
}

// Define the function to calculate weights
export const calculateWeightForActiveSets = ({
  week,
  trainingMax,
}: {
  week: keyof typeof WEEK_MAP
  trainingMax: number
}): { first: number; second: number; third: number } => {
  const weekIndex = WEEK_MAP[week]
  if (weekIndex === undefined) {
    throw new Error(`Invalid week: ${week}`)
  }

  const percentages = PERCENTAGES_BY_WEEK[weekIndex]

  return {
    first: roundDownToNearestFive(percentages.first * trainingMax),
    second: roundDownToNearestFive(percentages.second * trainingMax),
    third: roundDownToNearestFive(percentages.third * trainingMax),
  }
}
