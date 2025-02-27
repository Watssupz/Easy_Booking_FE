<script>
import Headerbar from "./Headerbar.vue";
import Footer from "./Footer.vue";
import { debounce } from "lodash";
export default {
  name: "SearchPage",
  components: {
    Headerbar,
    Footer,
  },
  props: {
    searchQuery: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      searchQuery: "",
      searchResults: [],
      isLoading: false,
    };
  },
  created() {
    const state = window.history.state || {};
    this.searchQuery = state.searchQuery || "";
    if (this.searchQuery) {
      this.fetchSearchRoomData();
    }

    this.debounceSearch = debounce(() => {
      this.fetchSearchRoomData();
    }, 300); // 300ms delay
  },
  watch: {
    searchQuery(newQuery) {
      this.internalSearchQuery = newQuery;
      this.debounceSearch();
    },
  },
  methods: {
    async fetchSearchRoomData() {
      this.isLoading = true;
      try {
        const response = await fetch("https://localhost:7210/api/R/Search", {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            location: this.internalSearchQuery,
          }),
        });

        if (!response.ok) {
          throw new Error(
            `Search API error: ${response.status} - ${response.statusText}`
          );
        }

        const result = await response.json();
        this.searchResults = result.data || [];
      } catch (error) {
        console.error("Fetch error: ", error);
        this.searchResults = [];
      } finally {
        this.isLoading = false;
      }
    },
    formatPrice(price) {
      if (!price && price !== 0) return "0";
      return Number(price).toLocaleString("vi-VN");
    },
  },
};
</script>

<template>
  <Headerbar />
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-3">
        <div class="searchAdvance">
          <p class="m-0 fw-bold fs-4">Tìm</p>
          <p class="p-0 m-0 fs-6">Tên chỗ nghỉ / điểm đến:</p>
          <input
            style="width: 100%"
            type="text"
            v-model="searchQuery"
            placeholder="Enter location..."
            @input="debounceSearch"
            @keypress.enter="fetchSearchRoomData"
          />
        </div>
      </div>
      <div class="col-md-9" v-if="!isLoading">
        <div v-if="searchResults.length">
          <h5 class="pt-3 pb-3">
            Tìm thấy: {{ searchResults.length }} chỗ nghỉ
          </h5>

          <!-- list room -->
          <div
            v-for="result in searchResults"
            :key="result.id"
            class="row searchList p-2 mb-2 shadow"
          >
            <div class="col-md-4">
              <img
                class="img-fluid rounded float-start"
                src="https://i.ibb.co/ZpqsHyFd/VungTau.jpg"
                alt=""
              />
            </div>
            <div class="col-md-8 pt-1">
              <div class="row align-items-center">
                <div class="col-md-8">
                  <h5 class="m-0">{{ result.room_number }}</h5>
                </div>
                <div class="col-md-4">
                  <div class="row align-items-center">
                    <div class="col-md-9">
                      <p class="p-0 m-0 text-sm-end">Rate</p>
                      <p class="p-0 m-0 text-sm-end">22 review</p>
                    </div>
                    <div
                      class="col-md-3 d-flex bg-white justify-content-center rounded"
                    >
                      <p class="p-0 m-0">5.0</p>
                    </div>
                  </div>
                </div>
              </div>
              <p>{{ result.location }}</p>
              <div class="row justify-content-end align-items-center">
                <div class="col-md-12">
                  <p class="text-end">
                    VND {{ formatPrice(result.price_per_night) }}
                  </p>
                  <button class="float-end detail_btn">Detail</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="searchQuery" class="no-results">
          Không tìm thấy kết quả cho "{{ searchQuery }}".
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.searchAdvance {
  padding: 15px;
  border-radius: 8px;
  background-color: #d8cbc4;
}
.searchAdvance input {
  border: 1px solid #765341;
  border-radius: 5px;
}

.searchList {
  border-radius: 8px;
  border: 1px solid gray;
  background-color: rgba(160, 134, 121, 0.3);
}

.detail_btn {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  background-color: #f8f8f8;
  color: #765341;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.detail_btn:hover {
  background-color: #6a4a3a;
  color: white;
}

.no-results {
  text-align: center;
  padding: 20px;
  color: #666;
  background-color: #f8f8f8;
  border-radius: 8px;
  margin-top: 20px;
}
</style>
