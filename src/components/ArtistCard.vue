<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  painting: {
    id: number;
    name: string;
    imageUrl: string;
    created: string;
    location: string;
    author: string;
  };
}>();

const isHovered = ref(false);
</script>

<template>
  <div class="painting-card">
    <div class="image-container">
      <img
        :src="`https://test-front.framework.team/${painting.imageUrl}`"
        alt="картина"
        class="img"
      />
      <div class="details">
        <div class="det-vis">
          <h3>{{ painting.name }}</h3>
          <span class="year">{{ painting.created }}</span>
        </div>
        <div class="det">
          <h3 class="author">{{ painting.author }}</h3>
          <span class="location year">{{ painting.location }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$font-inter: 'Inter', sans-serif;
$font-name: 'Cormorant SC', serif;

.image-container {
  position: relative;
  overflow: hidden;

  img {
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }

  &:hover .det-vis {
    transform: translateY(300%);
  }

  &:hover .det {
    transform: translateX(0);
    opacity: 1;
  }
}

.painting-card {
  max-width: 392px;
  max-height: 260px;
  overflow: hidden;
  position: relative;

  .image-container {
    position: relative;
    overflow: hidden;

    img {
      width: 392px;
      height: 260px;
      object-fit: cover;
    }
  }

  .details {
    position: absolute;
    bottom: 0;
    left: 0;
    background: white;
    padding: 10px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    height: 82px;
    width: 300px;
    border-left: 4px solid #9b4b4b;
    overflow: visible;
    z-index: 0;
  }

  .det-vis {
    transition: transform 0.7s ease;
  }

  .det {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateX(-100%) translateY(-50%);
    opacity: 0;
    transition:
      transform 0.5s ease,
      opacity 0.5s ease;
    white-space: nowrap;
    z-index: 1;
    pointer-events: none;
    padding-left: 10px;
  }

  .image-container:hover .det {
    transform: translateX(0) translateY(-50%);
    opacity: 1;
    pointer-events: auto;
  }

  h3 {
    color: black;
    margin: 0;
    font-size: 16px;
    text-transform: uppercase;
    white-space: wrap;
    font-family: 'Cormorant SC', serif;
    font-weight: 500;
  }

  .year {
    color: #9b4b4b;
    font-size: 12px;
    font-weight: bold;
  }
}
</style>
