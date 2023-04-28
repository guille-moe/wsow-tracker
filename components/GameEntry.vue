<template>
  <div
    class="grid py-6"
    :style="gridStyle"
  >
    <div class="px-5">
      <GameInput
        :value="gameForm.placement"
        type="text"
        class="
          w-full bg-transparent focus:ring-0
          border border-green-600/20 focus:border-green-600
        "
        @input="setPlacement"
        @enter="saveGame"
      />
    </div>
    <div
      v-for="player in store.currentPlayers"
      :key="player.id"
      class="px-6"
    >
      <GameScoreInput
        class="
          w-full bg-transparent focus:ring-0
          border border-green-600/20 focus:border-green-600
        "
        :player-id="player.id"
        :kills="(gameForm.scores[player.id] || {}).kills || ''"
        @input="changeGameScore"
        @enter="saveGame"
      />
    </div>
    <div class="flex self-center justify-center text-xl">
      {{ allKills }}
    </div>
    <div class="flex self-center justify-center text-xl">
      {{ weigthedScore }}
    </div>
    <div class="flex self-center justify-center ">
      <button
        v-if="!isNewGame && hasChanged"
        class="text-green-600/80 hover:text-green-600 ease-linear duration-300 px-3 py-2"
        @click="assignGameForm"
      >
        <Icon
          name="undo"
          size="24"
        />
      </button>

      <button
        v-if="hasChanged"
        :disabled="!canSave"
        :class=" {
          'text-green-600/80 hover:text-green-600 ': canSave,
          'text-green-600/20 cursor-default': !canSave,
        }"
        class="ease-linear duration-300 px-3 py-2"
        @click="saveGame"
      >
        <Icon
          name="save"
          size="24"
        />
      </button>
      <button
        v-if="!isNewGame && !hasChanged"
        class="text-green-600/80 hover:text-green-600 ease-linear duration-300 px-3 py-2"
        @click="destroyGame"
      >
        <Icon
          name="trash"
          size="24"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from '../store/tracker_store';

const store = useStore();

const props = defineProps({
  game: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});
const isNewGame = computed(() => !props.game.id);

const gameForm = ref({
  placement: '',
  scores: {},
});

//
// Sync game and gameForm
//
const assignGameForm = () => {
  gameForm.value = {
    placement: props.game.placement,
    scores: props.game.scores.reduce((indxr, score) => {
      indxr[score.player_id] = score;
      return indxr;
    }, {}),
  };
};

watch(props.game, async () => {
  if (props.game.id) {
    assignGameForm();
  }
}, { immediate: true });

//
// Form
//
const setPlacement = (placement) => {
  gameForm.value.placement = placement;
};

const changeGameScore = (score) => {
  gameForm.value.scores[score.player_id] = score;
};

const hasChanged = computed(() => {
  if (isNewGame.value) {
    return true;
  }

  const { placement, scores } = gameForm.value;
  const { placement: oldPlacement } = props.game;
  if (placement !== oldPlacement) {
    return true;
  }

  return !!Object.values(props.game.scores).find((oldScore) => {
    const newScore = scores[oldScore.player_id];
    return newScore && newScore.kills !== oldScore.kills;
  });
});

const canSave = computed(() => {
  const placementN = Number.parseInt(gameForm.value.placement, 10);
  const scores = Object.values(gameForm.value.scores);

  const hasEnoughScore = scores.length === store.currentPlayers.length;
  const invalidScores = scores.find((score) => !Number.isInteger(Number.parseInt(score.kills, 10)));

  return Number.isInteger(placementN) && hasEnoughScore && !invalidScores && hasChanged.value;
});

const createGame = () => {
  const time = new Date();
  const { placement } = gameForm.value;
  const scores = Object.values(gameForm.value.scores);

  const game = {
    id: crypto.randomUUID(),
    placement,
    scores,
    created_at: time.toISOString(),
  };

  store.createGame(game).then(() => {
    gameForm.value = {
      placement: '',
      scores: {},
    };
  });
};

const updateGame = () => {
  const { placement } = gameForm.value;
  const scores = Object.values(gameForm.value.scores);

  const game = {
    id: props.game.id,
    placement,
    scores,
    created_at: props.game.created_at,
  };

  store.updateGame(game).catch(() => {
    assignGameForm();
  });
};

const saveGame = () => {
  if (canSave.value) {
    if (isNewGame.value) {
      createGame();
    } else {
      updateGame();
    }
  }
};

const destroyGame = () => {
  store.destroyGame(props.game);
};

//
// Scores
//
const allKills = computed(() => {
  const scores = Object.values(gameForm.value.scores);
  return scores.reduce((acc, score) => acc + Number(score.kills || '0'), 0);
});

const weigthedScore = computed(() => {
  let weight = 1;

  const placement = Number(gameForm.value.placement);
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

  const score = allKills.value * weight;
  return Math.round(score * 100) / 100;
});

const gridStyle = computed(() => ({
  'grid-template-columns': `repeat(${store.currentPlayers.length + 4}, minmax(0, 1fr))`,
}));
</script>
