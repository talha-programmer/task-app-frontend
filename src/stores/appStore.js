import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }

//   return { count, doubleCount, increment }
// })


export const useStore = defineStore('appStore', {
  state: () => {
    return {
      token: '',
      user: {},
      authenticated: false,
      tasks: [],
    }
  },
  
  actions: {
    async verifyToken() {

      const token = localStorage.getItem('token');
      // const baseUrl = process.env.VUE_APP_BACKEND_BASE_URL;
      const baseUrl = "http://127.0.0.1:8000/api/v1";
      await axios.get(`${baseUrl}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        }
      }).then((response) => {
        if(response.status == true) {
          this.token = token;
          this.authenticated = true;

        } else {
          this.token = '';
          this.authenticated = false;
        }
      })
    },

    async loginUser(data) {
      const baseUrl = "http://127.0.0.1:8000/api/v1";
      await axios.post(`${baseUrl}/login`, data).then((response) => {
        if(response.data.status == true) {
          const data = {response};
          this.token = data.token;
          this.user = data.user;
          this.authenticated = true;

        } else {
          this.token = '';
          this.authenticated = false;
          this.user = {};
        }
      })
    },

    setToken(token) {
      localStorage.setItem('token', token);
      this.token = token;
    }
  }
})
