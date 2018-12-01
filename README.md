## Singing System

- Triggers different sounds depending on input
- Fills internal spawning counter (based on activation time)
- Logic to reset sing time

```javascript
state = {
  currentSingTime: 30
};

actions = {
  triggerBirdSinging,
  handleSingTimeReset
};
```

## Spawn System

- Triggers bird spawning depending on `currentSingTime`
- Spawn should reset `currentSingTime`
- Sacrifice animation trigger

```javascript
state = {
  birdCount: 3,
  sacrifice: true
};

actions = {
  spawnBird,
  sacrificeBirds
};
```

## Sun System

- Triggers loose condition
- Expansion logic
- Expansion animation with sound effect (sync needed)
- Background chords (no sync needed)
- Sacrifice logic

```javascript
state = {
  current: 300,
  supernovaThereshold: 1000,
  expansionSpeed: 10,
  currentStep: 0,
  steps: ['sun01.png', 'sun02.png']
};

actions = {
  triggerSunExpansion,
  triggerSacrifice
};
```

## Overall architecture

```javascript
<Game>
  <SingSystem>
    {(currentSingTime, handleSingTimeReset) => {
      return (
        <BirdSpawner
          singTime={currentSingTime}
          singTimeReset={handleSingTimeReset}
        >
          {sacrifice => <Sun sacrifice={sacrifice} />}
        </BirdSpawner>
      );
    }}
  </SingSystem>
</Game>
```
