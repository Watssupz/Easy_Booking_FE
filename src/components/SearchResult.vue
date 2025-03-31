<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import { debounce } from "lodash";
import { API_ENDPOINTS } from "@/constant/apiConstants";
export default {
  name: "SearchPage",
  components: {
    Header,
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
        const response = await fetch(`${API_ENDPOINTS.R_SEARCH}`, {
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
    goToDetail(id) {
      this.$router.push(`/detail/${id}`);
    },
  },
};
</script>

<template>
  <Header />
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
      :key="result.room_id"
      class="searchList mb-2 shadow-sm"
    >
      <div class="row g-0">
        <!-- Phần hình ảnh -->
        <div class="col-md-4">
          <img
            class="img-fluid rounded-start"
            :src="result.thumbnail || 'https://i.ibb.co/6w0fNhd/FF7D77.png'"
            alt="Room thumbnail"
            style="object-fit: cover; height: 100%; width:70%; max-height: 120px;"
          />
        </div>
        
        <!-- Phần thông tin -->
        <div class="col-md-8 p-2">
          <h5 class="mb-1 room-title">{{ result.room_number }}</h5>

          <!-- Giá và nút chi tiết được đẩy lên -->
          <div class="d-flex justify-content-between align-items-center mb-2">
            <p class="price mb-0">
              VND {{ formatPrice(result.price_per_night) }} / đêm
            </p>
            <button
              class="detail_btn"
              @click="goToDetail(result.room_id)"
            >
              Xem chi tiết
            </button>
          </div>

          <!-- Vị trí -->
          <p class="location mb-0">
            <img
              style="height: 1em; vertical-align: middle; margin-right: 5px;"
              src="@/assets/icons/location.png"
              alt="Location icon"
            />
            {{ result.location }}
          </p>
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
  padding: 8px;
}

.searchList {
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
  /* Thu nhỏ chiều cao tổng thể của card */
  max-height: 140px;
}

.searchList:hover {
  transform: translateY(-3px);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1) !important;
}

.room-title {
  color: #333;
  font-weight: 600;
  font-size: 1.1rem; /* Thu nhỏ font tiêu đề */
}

.location {
  color: #666;
  font-size: 0.85rem; /* Thu nhỏ font vị trí */
}

.price {
  color: #d32f2f;
  font-weight: 600;
  font-size: 0.95rem; /* Thu nhỏ font giá */
}

.detail_btn {
  padding: 6px 12px; /* Thu nhỏ nút */
  border-radius: 5px;
  font-size: 0.85rem; /* Thu nhỏ font nút */
  background-color: #765341;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.detail_btn:hover {
  background-color: #5a3e2e;
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
