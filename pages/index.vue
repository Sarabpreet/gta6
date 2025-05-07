<template>
  <div
    class="min-h-screen max-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-purple-950 text-gray-800 dark:text-gray-200 transition-colors duration-300 overflow-hidden relative"
  >
    <!-- Progress Border for entire page -->
    <div class="fixed inset-0 pointer-events-none z-50">
      <!-- Top border (left to right) -->
      <div
        class="absolute top-0 left-0 h-2 bg-gradient-to-r from-pink-500 to-purple-600"
        :style="{ width: `${countdownPercentage}%` }"
      ></div>

      <!-- Right border (top to bottom) - Fixed positioning -->
      <div
        class="absolute top-0 right-0 w-2 bg-gradient-to-b from-purple-600 to-pink-500"
        :style="{
          height:
            countdownPercentage >= 25
              ? `${Math.min(100, (countdownPercentage - 25) * 4)}%`
              : '0%',
        }"
      ></div>

      <!-- Bottom border (right to left) -->
      <div
        class="absolute bottom-0 right-0 h-2 bg-gradient-to-l from-pink-500 to-purple-600"
        :style="{
          width:
            countdownPercentage >= 50
              ? `${Math.min(100, (countdownPercentage - 50) * 4)}%`
              : '0%',
        }"
      ></div>

      <!-- Left border (bottom to top) -->
      <div
        class="absolute bottom-0 left-0 w-2 bg-gradient-to-t from-purple-600 to-pink-500"
        :style="{
          height:
            countdownPercentage >= 75
              ? `${Math.min(100, (countdownPercentage - 75) * 4)}%`
              : '0%',
        }"
      ></div>
    </div>

    <!-- Background video (hidden but still playing) -->
    <div id="youtube-background-player" class="fixed inset-0 opacity-0"></div>

    <!-- Main content -->
    <div class="relative z-10 flex flex-col h-screen">
      <!-- Header -->
      <header class="py-4 px-6 flex justify-between items-center">
        <h1
          class="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400"
        >
          GTA VI
        </h1>

        <div class="flex items-center space-x-4">
          <!-- Focus Sprint Button -->
          <button
            v-if="!sprintActive"
            @click="toggleSprintOptions"
            class="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all shadow-glow-sm flex items-center space-x-2"
          >
            <Icon
              name="heroicons:bolt"
              class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white"
            />
            <span>Focus Sprint</span>
          </button>
          <div
            v-else
            class="flex items-center space-x-2 bg-gray-800/40 dark:bg-gray-700/40 px-3 py-1.5 rounded-lg border border-pink-500/30"
          >
            <div
              class="text-xs sm:text-sm font-medium text-pink-400 flex items-center"
            >
              <div class="w-3 h-3 mr-1.5 relative">
                <div
                  class="absolute inset-0 rounded-full bg-pink-500 opacity-75 animate-ping"
                ></div>
                <div class="absolute inset-0 rounded-full bg-pink-500"></div>
              </div>
              {{ formatSprintTime(sprintTimeLeft) }}
            </div>
            <button
              @click="endFocusSprint"
              class="text-xs bg-gradient-to-r from-red-500 to-red-600 text-white px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-glow-sm flex items-center"
            >
              <Icon
                name="heroicons:x-mark"
                class="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white mr-1"
              />
              <span>End</span>
            </button>
          </div>

          <!-- Theme Toggle -->
          <button
            @click="toggleColorMode"
            class="p-2 sm:p-2.5 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 hover:from-gray-300 hover:to-gray-400 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all shadow-glow-sm"
            aria-label="Toggle color mode"
          >
            <Icon
              v-if="colorMode.value === 'dark'"
              name="heroicons:sun"
              class="h-4 w-4 sm:h-5 sm:w-5 text-yellow-300"
            />
            <Icon
              v-else
              name="heroicons:moon"
              class="h-4 w-4 sm:h-5 sm:w-5 text-purple-700"
            />
          </button>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-grow flex flex-col items-center justify-center px-4">
        <!-- GTA VI Countdown Section -->
        <div
          class="relative rounded-xl shadow-xl p-8 max-w-2xl w-full dark:border-gray-700 backdrop-blur-sm"
        >
          <!-- Progress border container -->

          <h2
            class="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-blue-400 text-center"
          >
            GTA VI
          </h2>

          <p
            class="text-base sm:text-lg mb-4 sm:mb-6 max-w-md mx-auto text-center dark:text-purple-200 text-gray-700"
          >
            The next chapter is coming. Prepare for an unprecedented journey.
          </p>

          <!-- Countdown Timer -->
          <div class="w-full max-w-md mx-auto">
            <div
              class="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-1 mb-4 sm:mb-6 overflow-hidden"
            >
              <div
                class="bg-gradient-to-r from-pink-500 to-purple-600 h-1 rounded-full"
                :style="{ width: `${countdownPercentage}%` }"
              ></div>
            </div>

            <div class="flex justify-between">
              <div class="countdown-item">
                <div
                  class="countdown-value text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400"
                >
                  {{ timeLeft.months }}
                </div>
                <div
                  class="countdown-label dark:text-purple-300 text-purple-700"
                >
                  Months
                </div>
              </div>
              <div class="countdown-item">
                <div
                  class="countdown-value text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400"
                >
                  {{ timeLeft.days }}
                </div>
                <div
                  class="countdown-label dark:text-purple-300 text-purple-700"
                >
                  Days
                </div>
              </div>
              <div class="countdown-item">
                <div
                  class="countdown-value text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400"
                >
                  {{ timeLeft.hours }}
                </div>
                <div
                  class="countdown-label dark:text-purple-300 text-purple-700"
                >
                  Hours
                </div>
              </div>
              <div class="countdown-item">
                <div
                  class="countdown-value text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400"
                >
                  {{ timeLeft.minutes }}
                </div>
                <div
                  class="countdown-label dark:text-purple-300 text-purple-700"
                >
                  Minutes
                </div>
              </div>
              <div class="countdown-item">
                <div
                  class="countdown-value text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400"
                >
                  {{ timeLeft.seconds }}
                </div>
                <div
                  class="countdown-label dark:text-purple-300 text-purple-700"
                >
                  Seconds
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Focus Sprint Section - Separated from GTA countdown -->
        <div class="mt-8 w-full max-w-md">
          <div class="text-center mb-4">
            <h3
              class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400"
            >
              Stay Focused While You Wait
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Use Focus Sprint to maximize your productivity
            </p>
          </div>

          <!-- Focus Sprint Next Button -->
          <div class="flex flex-col items-center space-y-4">
            <button
              v-if="!sprintActive"
              @click="toggleSprintOptions"
              class="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:from-pink-600 hover:to-purple-700 transition-all text-sm sm:text-base shadow-glow overflow-hidden w-full"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-purple-700/20 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
              <div class="flex items-center space-x-3">
                <div
                  class="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
                >
                  <Icon
                    name="heroicons:play-solid"
                    class="h-5 w-5 text-white ml-0.5"
                  />
                </div>
                <span class="font-medium">Start Focus Sprint</span>
              </div>
              <div
                class="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-pink-300 to-purple-300 opacity-50"
              ></div>
            </button>

            <button
              v-else
              @click="endFocusSprint"
              class="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 transition-all text-sm sm:text-base shadow-glow overflow-hidden w-full"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-700/20 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
              <div class="flex items-center space-x-3">
                <div
                  class="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
                >
                  <Icon
                    name="heroicons:stop-solid"
                    class="h-5 w-5 text-white"
                  />
                </div>
                <div class="flex flex-col items-start">
                  <span class="font-medium">Stop Sprint</span>
                  <span class="text-xs text-white/80">{{
                    formatSprintTime(sprintTimeLeft)
                  }}</span>
                </div>
              </div>
              <div
                class="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-red-300 to-red-400 opacity-50"
              ></div>
            </button>
          </div>
        </div>
      </main>

      <!-- Footer -->
      <footer class="py-3 sm:py-4 px-4 sm:px-6 text-center">
        <div class="text-xs text-gray-500 dark:text-gray-400">
          Built by
          <a
            href="https://twitter.com/saarabpreet"
            target="_blank"
            rel="noopener noreferrer"
            class="text-pink-500 hover:text-pink-400 transition-colors"
            >sarabpreet (@saarabpreet)</a
          >
          •
          <a
            href="https://www.youtube.com/watch?v=QdBZY2fkU-0"
            target="_blank"
            rel="noopener noreferrer"
            class="text-pink-500 hover:text-pink-400 transition-colors"
            >Watch Trailer</a
          >
          •
          <a
            href="https://github.com/sarabpreet/gta6"
            target="_blank"
            rel="noopener noreferrer"
            class="text-pink-500 hover:text-pink-400 transition-colors"
            >GitHub</a
          >
        </div>
      </footer>
    </div>

    <!-- Sprint Options Modal -->
    <div
      v-if="showSprintOptions"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      @click.self="showSprintOptions = false"
    >
      <div
        class="bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl p-6 max-w-sm w-full border border-gray-200 dark:border-purple-500/20 shadow-glow"
      >
        <h3
          class="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400"
        >
          Select Sprint Duration
        </h3>
        <div class="grid grid-cols-2 gap-3 mb-6">
          <button
            v-for="duration in sprintDurations"
            :key="duration.value"
            @click="startFocusSprintWithDuration(duration.value)"
            class="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <span class="text-2xl font-bold text-pink-500 dark:text-pink-400">{{
              duration.label
            }}</span>
            <span class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{
              duration.description
            }}</span>
          </button>
        </div>
        <div class="flex justify-end">
          <button
            @click="showSprintOptions = false"
            class="px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Sprint Summary Modal -->
    <div
      v-if="showSprintSummary"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
    >
      <div
        class="bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl p-6 max-w-sm w-full border border-gray-200 dark:border-purple-500/20 shadow-glow"
      >
        <h3
          class="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400"
        >
          Focus Sprint Summary
        </h3>
        <div class="mb-4 text-gray-700 dark:text-purple-200">
          <p class="mb-2">
            Total focus time:
            <span class="font-semibold text-pink-500 dark:text-pink-400">{{
              formatSprintTime(totalFocusTime)
            }}</span>
          </p>
          <p>
            Started at:
            <span class="font-semibold text-purple-600 dark:text-purple-300">{{
              sprintStartTime
            }}</span>
          </p>
        </div>
        <div class="flex justify-end">
          <button
            @click="closeSprintSummary"
            class="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded hover:from-pink-600 hover:to-purple-700 transition-all shadow-glow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

// SEO Configuration
useHead({
  title: "GTA VI Countdown - Official Release Timer",
  titleTemplate: "%s | Grand Theft Auto VI",
  meta: [
    {
      name: "description",
      content:
        "Track the official countdown to GTA VI release. Stay focused and productive while you wait for the next chapter in the Grand Theft Auto series.",
    },
    {
      name: "keywords",
      content:
        "GTA VI, Grand Theft Auto 6, GTA 6 countdown, GTA VI release date, Rockstar Games",
    },

    // Open Graph / Facebook
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://gta.sarabpreet.dev/" },
    {
      property: "og:title",
      content: "GTA VI Countdown - Official Release Timer",
    },
    {
      property: "og:description",
      content:
        "Track the official countdown to GTA VI release. Stay focused and productive while you wait for the next chapter in the Grand Theft Auto series.",
    },
    {
      property: "og:image",
      content: "https://gta.sarabpreet.dev/og_cover.png",
    },
    { property: "og:image:alt", content: "GTA VI Countdown Timer" },
    { property: "og:site_name", content: "GTA VI Countdown" },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:url", content: "https://gta.sarabpreet.dev/" },
    {
      name: "twitter:title",
      content: "GTA VI Countdown - Official Release Timer",
    },
    {
      name: "twitter:description",
      content:
        "Track the official countdown to GTA VI release. Stay focused and productive while you wait for the next chapter in the Grand Theft Auto series.",
    },
    {
      name: "twitter:image",
      content: "https://gta.sarabpreet.dev/og_cover.png",
    },
    { name: "twitter:creator", content: "@saarabpreet" },

    // Additional SEO
    { name: "robots", content: "index, follow" },
    { name: "canonical", content: "https://gta.sarabpreet.dev/" },
    { name: "author", content: "sarabpreet (@saarabpreet)" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "theme-color", content: "#9333ea" },
  ],
  link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "GTA VI Countdown",
        url: "https://gta.sarabpreet.dev",
        description:
          "Track the official countdown to GTA VI release. Stay focused and productive while you wait for the next chapter in the Grand Theft Auto series.",
      }),
    },
  ],
});

// Color mode
const colorMode = useColorMode();
function toggleColorMode() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}

// Set initial color mode based on system preference
onMounted(() => {
  if (!colorMode.preference) {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    colorMode.preference = prefersDark ? "dark" : "light";
  }
});

// Watch for system color scheme changes
onMounted(() => {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleChange = (e) => {
    if (!colorMode.preference || colorMode.preference === "system") {
      colorMode.preference = e.matches ? "dark" : "light";
    }
  };

  mediaQuery.addEventListener("change", handleChange);

  onUnmounted(() => {
    mediaQuery.removeEventListener("change", handleChange);
  });
});

// Countdown Timer Logic
const targetDate = new Date("2026-05-26T00:00:00").getTime();
const timeLeft = ref({
  months: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});
let intervalId = null;

// Calculate percentage for progress bar
const countdownPercentage = computed(() => {
  const now = new Date().getTime();
  const total = targetDate - new Date("2023-12-05T00:00:00").getTime(); // Announcement date
  const elapsed = now - new Date("2023-12-05T00:00:00").getTime();
  return Math.min(100, Math.max(0, (elapsed / total) * 100));
});

function calculateTimeLeft() {
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference <= 0) {
    timeLeft.value = { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    if (intervalId) clearInterval(intervalId);
    return;
  }

  const totalSeconds = Math.floor(difference / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  const approxMonths = Math.floor(totalDays / 30.4375);
  const remainingDays = totalDays % 30.4375;

  timeLeft.value = {
    months: approxMonths,
    days: Math.floor(remainingDays),
    hours: totalHours % 24,
    minutes: totalMinutes % 60,
    seconds: totalSeconds % 60,
  };
}

// Focus Sprint Logic
const sprintActive = ref(false);
const sprintTimeLeft = ref(0);
const sprintDuration = ref(25 * 60); // Default: 25 minutes in seconds
const sprintStartTime = ref("");
const totalFocusTime = ref(0);
const showSprintSummary = ref(false);
const showSprintOptions = ref(false);
let sprintIntervalId = null;

// Sprint duration options
const sprintDurations = [
  { label: "25m", value: 25 * 60, description: "Pomodoro" },
  { label: "30m", value: 30 * 60, description: "Half hour" },
  { label: "60m", value: 60 * 60, description: "Full hour" },
  { label: "120m", value: 120 * 60, description: "2 hours" },
  { label: "180m", value: 180 * 60, description: "3 hours" },
];

function toggleSprintOptions() {
  showSprintOptions.value = !showSprintOptions.value;
}

function startFocusSprintWithDuration(duration) {
  sprintDuration.value = duration;
  showSprintOptions.value = false;
  startFocusSprint();
}

function startFocusSprint() {
  sprintActive.value = true;
  sprintTimeLeft.value = sprintDuration.value;
  sprintStartTime.value = new Date().toLocaleTimeString();

  // Start the timer
  sprintIntervalId = setInterval(() => {
    if (sprintTimeLeft.value > 0) {
      sprintTimeLeft.value--;
    } else {
      endFocusSprint();
    }
  }, 1000);

  // Unmute the video if it's playing
  if (player && typeof player.unMute === "function") {
    player.unMute();
  }
}

function endFocusSprint() {
  if (sprintIntervalId) {
    clearInterval(sprintIntervalId);
  }

  // Calculate total focus time
  totalFocusTime.value = sprintDuration.value - sprintTimeLeft.value;

  // Reset sprint state
  sprintActive.value = false;

  // Show summary
  showSprintSummary.value = true;

  // Mute the video
  if (player && typeof player.mute === "function") {
    player.mute();
  }
}

function closeSprintSummary() {
  showSprintSummary.value = false;
}

function formatSprintTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }

  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

// YouTube Player Logic
let player;
const videoId = "XBYKkWSeo94";

function loadYouTubeAPI() {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve(window.YT);
      return;
    }
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      document.head.appendChild(tag);
    }
    window.onYouTubeIframeAPIReady = () => {
      resolve(window.YT);
    };
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
  // Hide the iframe but keep it playing
  const iframe = event.target.getIframe();
  if (iframe) {
    iframe.style.position = "absolute";
    iframe.style.top = "50%";
    iframe.style.left = "50%";
    iframe.style.width = "1px";
    iframe.style.height = "1px";
    iframe.style.transform = "translate(-50%, -50%)";
    iframe.style.pointerEvents = "none";
    iframe.style.opacity = "0";
  }
}

function onPlayerStateChange(event) {
  if (event.data === window.YT.PlayerState.ENDED) {
    player.seekTo(0);
    player.playVideo();
  }
}

onMounted(async () => {
  calculateTimeLeft();
  intervalId = setInterval(calculateTimeLeft, 1000);

  // Initialize YouTube Player
  const YT = await loadYouTubeAPI();
  if (document.getElementById("youtube-background-player")) {
    player = new YT.Player("youtube-background-player", {
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        mute: 1,
        controls: 0,
        showinfo: 0,
        modestbranding: 1,
        loop: 0,
        playlist: videoId,
        fs: 0,
        iv_load_policy: 3,
        playsinline: 1,
        rel: 0,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  }
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
  if (sprintIntervalId) {
    clearInterval(sprintIntervalId);
  }
  if (player && typeof player.destroy === "function") {
    player.destroy();
  }
  window.removeEventListener("resize", () => {});
});
</script>

<style scoped>
/* Minimal styling */
#youtube-background-player {
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
}

.countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.countdown-value {
  font-size: 1.25rem;
  line-height: 1;
  font-weight: 600;
}

@media (min-width: 640px) {
  .countdown-value {
    font-size: 1.5rem;
  }
}

@media (min-width: 768px) {
  .countdown-value {
    font-size: 1.75rem;
  }
}

.countdown-label {
  font-size: 0.65rem;
  margin-top: 0.25rem;
}

@media (min-width: 640px) {
  .countdown-label {
    font-size: 0.75rem;
  }
}

/* Simple transition for theme changes */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Glow effects */
.shadow-glow {
  box-shadow: 0 0 15px rgba(219, 39, 119, 0.4), 0 0 30px rgba(147, 51, 234, 0.2);
}

.shadow-glow-sm {
  box-shadow: 0 0 8px rgba(219, 39, 119, 0.3), 0 0 16px rgba(147, 51, 234, 0.15);
}

/* Ensure full page height without scrolling */
html,
body {
  height: 100%;
  overflow: hidden;
}

/* Animation for the loader */
@keyframes ping {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  75%,
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* Progress border animation and fixes */
@keyframes glow-pulse {
  0%,
  100% {
    opacity: 0.8;
    box-shadow: 0 0 5px rgba(219, 39, 119, 0.5),
      0 0 10px rgba(147, 51, 234, 0.3);
  }
  50% {
    opacity: 1;
    box-shadow: 0 0 10px rgba(219, 39, 119, 0.7),
      0 0 20px rgba(147, 51, 234, 0.5);
  }
}

/* Apply glow animation to all border segments */
.fixed.inset-0.pointer-events-none.z-50 div {
  animation: glow-pulse 2s infinite;
}

/* Fix for right border visibility */
.fixed.inset-0.pointer-events-none.z-50 div:nth-child(2) {
  right: 0;
  width: 2px;
  z-index: 60;
}

/* Fix for bottom border alignment */
.fixed.inset-0.pointer-events-none.z-50 div:nth-child(3) {
  bottom: 0;
  height: 2px;
  z-index: 60;
}

/* Fix for left border alignment */
.fixed.inset-0.pointer-events-none.z-50 div:nth-child(4) {
  left: 0;
  width: 2px;
  z-index: 60;
}
</style>
