<script setup>
import { ref, onMounted } from "vue";
import {useLayout} from "@/composables/useLayout";
const { primary, primaryColors, surface, surfaces } = useLayout();
const animate = ref(false);

// Define the primary color for the butterfly animation
const RedSuite = primaryColors.value.find(c => c.name === primary.value)?.palette?.[500] || "#10b981";
const BlackSuite = surfaces.value.find(c => c.name === surface.value)?.palette?.[500] || "#000000";

onMounted(() => {
  animate.value = true;
});
</script>

<template>
  <div class="pointer-events-none fixed top-1/3 left-0 w-full h-64 z-50">
    <div
      v-for="(suit, i) in ['♠', '♥', '♦', '♣']"
      :key="i"
      class="absolute text-5xl"
      :class="[
        `suit-${i}`,
        animate ? `fly-path-${i}` : ''
      ]"
      :style="{
        color: (suit === '♥' || suit === '♦') ? RedSuite : BlackSuite
      }"
    >
      {{ suit }}
    </div>
  </div>
</template>



<style scoped>
/* Staggered initial positions */
.suit-0 { top: 10%; left: -10%; }
.suit-1 { top: 30%; left: -10%; }
.suit-2 { top: 60%; left: -10%; }
.suit-3 { top: 80%; left: -10%; }

/* Fluttering paths with Bezier movement */
@keyframes flutter-0 {
  0%   { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0; }
  10%  { opacity: 1; }
  25%  { transform: translate(20vw, -10vh) rotate(-10deg) scale(1.1); }
  50%  { transform: translate(50vw, 10vh) rotate(15deg) scale(1.2); }
  75%  { transform: translate(80vw, -5vh) rotate(-15deg) scale(1.1); }
  100% { transform: translate(120vw, 0vh) rotate(0deg) scale(0.8); opacity: 0; }
}

@keyframes flutter-1 {
  0%   { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0; }
  10%  { opacity: 1; }
  25%  { transform: translate(15vw, 5vh) rotate(10deg) scale(1.05); }
  50%  { transform: translate(55vw, -10vh) rotate(-20deg) scale(1.2); }
  75%  { transform: translate(85vw, 5vh) rotate(10deg) scale(1); }
  100% { transform: translate(125vw, 0vh) rotate(0deg) scale(0.9); opacity: 0; }
}

@keyframes flutter-2 {
  0%   { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0; }
  10%  { opacity: 1; }
  25%  { transform: translate(25vw, -15vh) rotate(-5deg) scale(1.1); }
  50%  { transform: translate(60vw, 5vh) rotate(20deg) scale(1.2); }
  75%  { transform: translate(90vw, -10vh) rotate(-10deg) scale(1); }
  100% { transform: translate(130vw, 0vh) rotate(0deg) scale(0.9); opacity: 0; }
}

@keyframes flutter-3 {
  0%   { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0; }
  10%  { opacity: 1; }
  25%  { transform: translate(30vw, 10vh) rotate(15deg) scale(1.15); }
  50%  { transform: translate(65vw, -5vh) rotate(-10deg) scale(1.1); }
  75%  { transform: translate(95vw, 10vh) rotate(10deg) scale(1); }
  100% { transform: translate(135vw, 0vh) rotate(0deg) scale(0.85); opacity: 0; }
}

/* Add animation with staggered durations */
.fly-path-0 {
  animation: flutter-0 4s ease-in-out forwards;
}
.fly-path-1 {
  animation: flutter-1 4.5s ease-in-out forwards;
}
.fly-path-2 {
  animation: flutter-2 5s ease-in-out forwards;
}
.fly-path-3 {
  animation: flutter-3 5.5s ease-in-out forwards;
}
</style>