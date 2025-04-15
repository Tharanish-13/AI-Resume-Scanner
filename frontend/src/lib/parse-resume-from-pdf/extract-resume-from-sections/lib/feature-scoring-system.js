// Give score to a feature based on its importance
const scoreFeature = (feature, weights) => {
    const lowerFeature = feature.toLowerCase();
  
    let score = 0;
    for (let keyword in weights) {
      if (lowerFeature.includes(keyword.toLowerCase())) {
        score += weights[keyword];
      }
    }
  
    return score;
  };
  
  // Rank features by score
  const rankFeatures = (features, weights) => {
    return features
      .map((feature) => ({
        feature,
        score: scoreFeature(feature, weights),
      }))
      .sort((a, b) => b.score - a.score);
  };
  
  module.exports = {
    scoreFeature,
    rankFeatures,
  };
  