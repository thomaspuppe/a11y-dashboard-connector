/**
 * Get the error and info statistics for a given html-validator result
 *
 * @param {object} The html-validator results
 * @returns {object} Object containing errorCount and infoCount
 */
module.exports = results => {
  return {
    accessibilityScore: results.advice.accessibility.score,
    bestpracticeScore: results.advice.bestpractice.score,
    performanceScore: results.advice.performance.score,
    totalScore: results.advice.score
  }
}
