<script setup>
import { useLayout } from "@/composables/useLayout";
import AppConfig from "@/components/ui/AppConfig.vue";
import Spade from "@/assets/images/spade.vue";
const { isDarkMode, toggleDarkMode } = useLayout();
</script>

<template>
  <div
    class="bg-gradient-to-br from-surface-0 via-surface-50 to-surface-100 dark:from-surface-900 dark:via-surface-800 dark:to-surface-950
           p-6 rounded-2xl max-w-7xl mx-auto border border-surface-200 dark:border-surface-700 w-full shadow-lg"
  >
    <div class="flex justify-between items-center flex-wrap gap-y-4">
      <!-- Logo & Branding -->
      <div class="flex gap-4 items-center">
        <div class="w-8 h-8 transition-transform duration-2000 ease-in-out hover:rotate-360">
          <Spade />
        </div>
        <div class="flex flex-col leading-tight">
          <span class="text-2xl font-bold text-primary tracking-tight">AYOOS</span>
          <span class="text-xs text-surface-500 dark:text-surface-400 -mt-1">Play Classic Card Games.</span>
        </div>
      </div>

      <!-- Settings & Dark Mode -->
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="w-10 h-10 flex items-center justify-center rounded-full
                 hover:bg-surface-100 dark:hover:bg-surface-800 transition-all
                 text-surface-900 dark:text-surface-0 focus:outline-none
                 focus:ring-1 focus:ring-primary focus:ring-offset-2
                 focus:ring-offset-surface-0 dark:focus:ring-offset-surface-950"
          @click="toggleDarkMode"
          title="Toggle Dark Mode"
        >
          <i :class="['pi text-base', { 'pi-moon': isDarkMode, 'pi-sun': !isDarkMode }]" />
        </button>

        <div class="relative">
          <Button
            v-styleclass="{
              selector: '@next',
              enterFromClass: 'hidden',
              enterActiveClass: 'animate-scalein',
              leaveToClass: 'hidden',
              leaveActiveClass: 'animate-fadeout',
              hideOnOutsideClick: true,
            }"
            icon="pi pi-cog"
            text
            rounded
            aria-label="Game Settings"
          />
          <AppConfig />
        </div>
      </div>
    </div>
  </div>
</template>