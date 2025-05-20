//для загрузки художников и отображения карточек //для полей и пагинации

<script setup lang="ts">
import search from '../assets/img/loopa.svg';

//позволяет выполнить код после загрузки страницы
import { onMounted, watch } from 'vue';
import { useArtistsStore } from '@/stores/artistsStore';
//показываем карточку
import ArtistCard from '@/components/ArtistCard.vue';

const artistsStore = useArtistsStore();

onMounted(() => {
  artistsStore.fetchLocations();
  artistsStore.fetchAuthors();
  //делаем запрос к серверу и получает данные о художниках
  artistsStore.fetchArtists();
});

// поиск
watch(
  () => artistsStore.searchQuery,
  () => {
    // Сбрасываем currentPage на 1 при новом поиске
    artistsStore.currentPage = 1;
    artistsStore.fetchArtists();
  },
);
</script>

<template>
  <div>
    <!-- <div class="input-control">
      <img :src="search" />
      <input class="search" v-model="artistsStore.searchQuery" placeholder="Painting title" />
    </div> -->
    <div class="input-control">
      <div class="input-wrapper">
        <img :src="search" class="search-icon" />
        <input class="search" v-model="artistsStore.searchQuery" placeholder="Painting title" />
      </div>
    </div>

    <div class="gallery">
      <ArtistCard
        v-for="painting in artistsStore.paintings"
        :key="painting.id"
        :painting="painting"
      />
    </div>

    <div class="pagination">
      <button
        v-for="page in artistsStore.totalPages"
        :key="page"
        @click="artistsStore.setPage(page)"
        :disabled="artistsStore.currentPage === page"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  button {
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    cursor: pointer;

    &:disabled {
      background-color: #ddd;
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
