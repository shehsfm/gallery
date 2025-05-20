import { defineStore } from 'pinia';
import axios from 'axios';

//создаем структуру обьекта с данными, которые мы будем получать от сервера
interface Painting {
  id: number;
  name: string;
  imageUrl: string;
  created: string;
  location: string;
  author: string;
}

interface Location {
  id: number;
  location: string;
}

interface Autor {
  id: number;
  name: string;
}

//хранилище artists в переменной useArtistsStore
export const useArtistsStore = defineStore('artists', {
  state: () => ({
    paintings: [] as Painting[],
    locations: [] as Location[],
    authors: [] as Autor[],
    totalPages: 1,
    currentPage: 1,
    limit: 6,
    isLoading: false,
    searchQuery: '',
  }),
  actions: {
    //загружаем картины с сервера
    async fetchArtists() {
      console.log('загрузка начинается!!!');
      this.isLoading = true;
      try {
        //делаем запрос серверу
        const res = await axios.get(
          `https://test-front.framework.team/paintings?_page=${this.currentPage}&_limit=${this.limit}&q=${this.searchQuery}`,
        );
        //результат запроса в paintings
        this.paintings = res.data.map((painting: any) => ({
          ...painting,
          location:
            this.locations.find((loc) => loc.id === painting.locationId)?.location || 'Unknown',
          author:
            this.authors.find((author) => author.id === painting.authorId)?.name ||
            'Unknown Author',
        }));
        //тут считаем сколько страниц получилось
        this.totalPages = Math.ceil(res.headers['x-total-count'] / this.limit);
      } catch (error) {
        console.error('Ошибка загрузки картин:', error);
      } finally {
        this.isLoading = false;
      }
    },
    // локации
    async fetchLocations() {
      try {
        const res = await axios.get('https://test-front.framework.team/locations ');
        this.locations = res.data;
      } catch (error) {
        console.error('Ошибка загрузки мест:', error);
      }
    },
    // авторы
    async fetchAuthors() {
      try {
        const res = await axios.get('https://test-front.framework.team/authors ');
        this.authors = res.data;
      } catch (error) {
        console.error('Ошибка загрузки авторов:', error);
      }
    },
    //для смены страницы, а после смены заново загружаем картины для текущей страницы
    setPage(page: number) {
      this.currentPage = page;
      this.fetchArtists();
    },
    //поисковоц запрос
    //переходит на первую страницу и загружаем картины в соответствии с запросом
    setSearch(query: string) {
      this.searchQuery = query;
      this.currentPage = 1;
      this.fetchArtists();
    },
  },
});
