
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// TODO: Abstact funciton to avoid repating random value
/*
  const canRender = this.state.spawnPoints.map(i => i.render).includes(false);
  let nextActiveSpawn = getRandomInt(0, this.state.spawnPoints.length - 1);
  while (this.state.spawnPoints[nextActiveSpawn].render && canRender) {
    nextActiveSpawn = getRandomInt(0, this.state.spawnPoints.length - 1);
  }
*/
