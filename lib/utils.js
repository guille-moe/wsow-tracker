export function displayRound(num) {
  return Math.round((num * 100)) / 100 || 0;
}

export function sum(array, key) {
  return array.reduce((acc, obj) => acc + Number(obj[key] || '0'), 0);
}

export function weightedPlacementScore(strPlacement, kills, fullPrecision = false) {
  const placement = Number(strPlacement);

  // define weight based on placement
  let weight = 1;
  if (placement === 1) {
    weight = 2;
  } else if (placement >= 2 && placement <= 5) {
    weight = 1.8;
  } else if (placement >= 6 && placement <= 10) {
    weight = 1.6;
  } else if (placement >= 11 && placement <= 20) {
    weight = 1.4;
  } else if (placement >= 21 && placement <= 35) {
    weight = 1.2;
  }

  const score = kills * weight;
  // Round to 2 decimal places
  if (fullPrecision) {
    return score;
  }
  return displayRound(score);
}
