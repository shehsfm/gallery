<!-- здесь кнопка для переключения темы -->

<template>
  <div class="container">
    <div class="header">
      <!-- если темная тема активна светлый логтип : темный -->
      <img :src="isDarkTheme ? logo : logodark" />
      <button @click="toggleTheme">
        <img :src="isDarkTheme ? light : dark" />
      </button>
    </div>
    <HomeView />
  </div>
</template>

<script setup lang="ts">
import logo from './assets/img/logo.svg';
import logodark from './assets/img/logodark.svg';
import light from './assets/img/lighton.svg';
import dark from './assets/img/darkon.svg';
import HomeView from './views/HomeView.vue';
// import ArtistCard from './components/ArtistCard.vue';
import { ref } from 'vue';
//текущая тема
const isDarkTheme = ref(false);

function toggleTheme() {
  isDarkTheme.value = !isDarkTheme.value;
  document.body.classList.toggle('dark', isDarkTheme.value);
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Cormorant+SC:wght@300;400;500;600;700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
$accent-red: #9b4b4b;
$accent-gold: #ab8956;
$font-inter: 'Inter', sans-serif;
$font-name: 'Cormorant SC', serif;
@mixin transition {
  transition:
    0.2s background-color ease-in-out,
    0.5s color ease-in-out,
    0.5s border ease-in-out,
    0.5s filter ease-in-out;
}

button {
  text-decoration: none;
  border: none;
  background-color: #00000000;
  cursor: pointer;
}

body {
  background-color: #fff;
  color: #000;
  @include transition;
  font-family: $font-inter;

  .details,
  h3,
  input {
    @include transition;
  }

  input {
    border: 1px solid #dedede;
  }

  &.dark {
    background-color: #1e1e1e;
    color: #fff;

    //!!! для темизации плашки
    .details {
      background-color: #1e1e1e;
      border-left: 4px solid $accent-gold;
      @include transition;

      h3 {
        color: #dedede;
        @include transition;
      }

      .year {
        color: $accent-gold;
        transition: 0.5s background-color ease-in-out;
      }
    }
    input {
      background-color: #1a1818;
      color: #575757;
      border: none;
      @include transition;
    }
    .pagination button {
      color: #fff;
    }
    .search {
      border: none;
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    padding: 30px 0px 30px 0px;
  }
}
.container {
  max-width: 1240px;
  margin: 0 auto;
}
</style>
