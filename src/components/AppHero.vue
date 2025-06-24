<script setup>
import { computed } from "vue";
import { useLayout } from "@/composables/useLayout";
import BgImage from "@/assets/images/background.vue"; // Your Vue background component

const { primary, primaryColors } = useLayout();
const heroHeading = "Classic Cards, Endless Possibilities";

const currentPrimaryColor = computed(() => {
  const colorObj = primaryColors.value.find((c) => c.name === primary.value);
  return colorObj?.palette?.[500] || "#10b981";
});

import SuitButterfly from "@/assets/animations/SuitButterfly.vue"; // Your butterfly animation component
</script>

<template>
  <section
    id="home-section"
    class="relative py-20 rounded-2xl max-w-7xl mx-auto border border-surface-200 dark:border-surface-700 w-full shadow-lg overflow-hidden"
  >
  <SuitButterfly />
    <!-- Content on top -->
    <div class="relative container mx-auto px-4 text-center md:text-left">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Empty div to balance grid -->
         <BgImage class="w-full h-full object-cover pointer-events-none" aria-hidden="true" />

        <!-- Text Section -->
        <div class="flex flex-col gap-6 text-surface-0" data-aos="fade-up">
          <h1 class="text-4xl md:text-5xl font-bold">
            {{ heroHeading }}
          </h1>
          <p class="text-lg leading-relaxed text-surface-200" data-aos-delay="100">
            Rediscover timeless card games and uncover new favorites — all built on the legendary 52-card deck. From strategy to speed, there's a game for everyone.
          </p>
          <div class="flex justify-center md:justify-start gap-4" data-aos-delay="200">
            <Button
              label="Explore Games"
              class="text-white shadow-md rounded"
              :style="{ backgroundColor: currentPrimaryColor, borderColor: currentPrimaryColor }"
              @click="$router.push('#games-section')"
            />
            <Button
              label="Buy a Deck"
              outlined
              rounded
              class="font-semibold"
              :style="{ color: currentPrimaryColor, borderColor: currentPrimaryColor }"
              @click="$router.push('#shop-section')"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
