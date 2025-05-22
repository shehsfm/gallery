//для загрузки художников и отображения карточек //для полей и пагинации
<script setup lang="ts">
import search from '../assets/img/loopa.svg';
import { onMounted, watch, computed } from 'vue';
import { useArtistsStore } from '@/stores/artistsStore';
import ArtistCard from '@/components/ArtistCard.vue';

const artistsStore = useArtistsStore();

onMounted(() => {
  artistsStore.fetchLocations();
  artistsStore.fetchAuthors();
  artistsStore.fetchArtists();
});

// при поиске сбрасываем на первую страницу
watch(
  () => artistsStore.searchQuery,
  () => {
    artistsStore.currentPage = 1;
    artistsStore.fetchArtists();
  },
);

// карточки по шесть штук
const currentPaintings = computed(() => {
  return Array.isArray(artistsStore.paintings) ? artistsStore.paintings : [];
});

// пагинация (icant)
const paginationPages = computed(() => {
  const totalPages = Math.max(1, artistsStore.totalPages);
  const currentPage = artistsStore.currentPage;
  const pages = [];

  pages.push(1);

  if (currentPage > 3) {
    pages.push('...');
  }

  for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push('...');
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
});
</script>

<template>
  <!-- строк а поиска -->
  <div class="input-control">
    <div class="input-wrapper">
      <img :src="search" class="search-icon" />
      <input class="search" v-model="artistsStore.searchQuery" placeholder="Painting title" />
    </div>
  </div>

  <!-- карточки -->
  <div class="gallery">
    <div v-if="currentPaintings.length === 0" class="text-center text-gray-500">
      картины не найдены!
    </div>
    <ArtistCard v-for="painting in currentPaintings" :key="painting.id" :painting="painting" />
  </div>

  <!-- пагинация -->
  <div v-if="artistsStore.totalPages > 1" class="pagination">
    <button
      @click="artistsStore.setPage(artistsStore.currentPage - 1)"
      :disabled="artistsStore.currentPage === 1"
    >
      <
    </button>

    <button
      v-for="page in paginationPages"
      :key="page"
      @click="typeof page === 'number' && artistsStore.setPage(page)"
      :disabled="artistsStore.currentPage === page"
      :class="[
        'px-3 py-1 rounded',
        typeof page === 'number'
          ? artistsStore.currentPage === page
            ? 'bg-blue-500 text-white font-bold'
            : 'bg-gray-200 hover:bg-gray-300'
          : 'bg-transparent cursor-default',
      ]"
    >
      {{ page }}
    </button>

    <button
      @click="artistsStore.setPage(artistsStore.currentPage + 1)"
      :disabled="artistsStore.currentPage === artistsStore.totalPages"
    >
      >
    </button>
  </div>
</template>

<style scoped lang="scss">
.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  padding: 1rem;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  button {
    margin: 0 0.25rem;
    padding: 0.5rem 0.75rem;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background-color: #e0e0e0;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }
}

// поиск!
.input-control {
  display: flex;
  justify-content: end;
}

.input-wrapper {
  position: relative;
  width: 336px;
}

.search {
  width: 100%;
  height: 36px;
  border-radius: 4px;
  padding: 2px 16px 2px 40px;
  border: 1px solid #dedede;
  box-sizing: border-box;
  font-size: 14px;

  &::placeholder {
    color: #999;
  }
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  pointer-events: none;
}
</style>
