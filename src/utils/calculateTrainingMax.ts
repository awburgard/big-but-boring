import { roundDownToNearestFive } from './roundDownToNearestFive'

export const TRAINING_MAX_PERCENTAGE = 0.9

export const calculateTrainingMax = (estimatedOneRepMax: number) => {
  // Step 1: Calculate 90% of the number
  const ninetyPercent = estimatedOneRepMax * TRAINING_MAX_PERCENTAGE

  // Step 2: Round down to the nearest whole number
  const roundedDown = Math.floor(ninetyPercent)

  // Step 3: Round down to the nearest multiple of 5
  return roundDownToNearestFive(roundedDown)
}
