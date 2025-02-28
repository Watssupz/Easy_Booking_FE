<script>
import Header from "./Header.vue";
import SearchBar from "./SearchBar.vue";
import Footer from "./Footer.vue";
import DestinationCard from "./DestinationCard.vue";
import { useRoute, useRouter } from "vue-router";
import { API_ENDPOINTS } from "@/constant/apiConstants";
export default {
  name: "HomePage",
  components: {
    Header,
    SearchBar,
    Footer,
    DestinationCard,
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      rooms: [],
      destinations: [
        {
          id: 1,
          name: "Vũng Tàu",
          image: "https://i.ibb.co/ZpqsHyFd/VungTau.jpg",
          flag: "🇻🇳",
        },
        {
          id: 2,
          name: "TP. Hồ Chí Minh",
          image: "https://i.ibb.co/cRwd14q/Ho-Chi-Minh-City.jpg",
          flag: "🇻🇳",
        },
        {
          id: 3,
          name: "Nha Trang",
          image: "https://i.ibb.co/JRrj0WzB/NhaTrang.jpg",
          flag: "🇻🇳",
        },
        {
          id: 4,
          name: "Hà Nội",
          image: "https://i.ibb.co/1fVwyBT4/Hanoi.jpg",
          flag: "🇻🇳",
        },
        {
          id: 5,
          name: "Mũi Né",
          image: "https://i.ibb.co/BHrphx9k/MuiNe.jpg",
          flag: "🇻🇳",
        },
        {
          id: 6,
          name: "Đà Nẵng",
          image: "https://i.ibb.co/dwy7XtQX/DaNang.png",
          flag: "🇻🇳",
        },
      ],
    };
  },
  created() {
    this.fetchRoomData();
  },
  methods: {
    async fetchRoomData() {
      try {
        const response = await fetch(API_ENDPOINTS.R_ALL, {
          method: "GET",
          headers: {
            Accept: "*/*",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        this.rooms = result.data;
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    },
    async handleSearch(query) {
      this.searchQuery = query;
      this.isLoading = true;

      try {
        const response = await fetch(API_ENDPOINTS.R_SEARCH, {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            location: query,
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
        console.error("Search error: ", error);
        this.searchResults = [];
      } finally {
        this.isLoading = false;
      }

      console.log("Searched for:", query);
    },
    async handleSearch(query) {
      this.router.push({ path: "/search", state: { searchQuery: query } });
    },
    navigateToSearch(query) {
      this.router.push({ path: "/search", state: { searchQuery: query } });
    },
  },
};
</script>

<template>
  <!-- header -->
  <Header />
  <div class="main-content">
    <div class="hero">
      <!-- title -->
      <h1>Find your next vacation spot</h1>
      <h2>Find hotel deals, home stays and more...</h2>
      <div class="w-50">
        <!-- search bar -->
        <SearchBar @search="handleSearch" />
      </div>
      <!-- list room -->
      <div class="container pt-4">
        <!-- <div class="row p-1 g-3">
          <div
            class="col-3 card-flip"
            v-for="roomData in rooms"
            :key="roomData.room.room_id"
          >
            <div class="card" style="height: 220px">
              <div class="front">
                <div class="card-head">
                  <img
                    class="card-img-top"
                    src="@/assets/bg-login.jpg"
                    alt="Card image cap"
                  />
                </div>

                <div class="card-body">
                  <p class="card-text">
                    {{ roomData.room.room_number }}
                  </p>
                </div>
              </div>
              <div class="back" style="background-color: #a08679">
                <p style="color: azure; padding: 5px; font-size: small">
                  {{ roomData.room.description }}
                </p>
              </div>
            </div>
          </div>
        </div> -->

        <div class="destinations">
          <p class="m-0 p-0 fs-3 fw-bold">Điểm đến đang thịnh hành</p>
          <p class="p-0">
            Du khách tìm kiếm về Việt Nam cũng đặt chỗ ở những nơi này
          </p>
          <div class="destination-grid">
            <destination-card
              v-for="destination in destinations"
              :key="destination.id"
              :name="destination.name"
              :image="destination.image"
              :flag="destination.flag"
              @click="navigateToSearch(destination.name)"
            />
          </div>
        </div>
      </div>

      <!-- footer -->
      <Footer />
    </div>
  </div>
</template>

<style scoped>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
}

.main-content {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header-bar {
  height: 60px;
  background-color: #f0f0f0;
  padding: 10px;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
}

.hero {
  background-size: cover;
  background-position: center;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 50px;
  align-items: center;
  color: white;
  flex-grow: 1;
}

/* css card */
/* .card-text {
  width: 100%;
  font-size: small;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-body {
  height: 120px;
  overflow: hidden;
  position: relative;
  border-radius: 5px;
}
.card {
  height: 100%;
  width: 100%;
  position: relative;
  transition: transform 1000ms;
  transform-style: preserve-3d;
}

.card-flip:hover > .card {
  cursor: pointer;
  transform: rotateY(180deg);
}

.front,
.back {
  height: 100%;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 0 5px 2px rbga(50, 50, 50, 0.25);
  position: absolute;
  backface-visibility: hidden;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-head img {
  width: 100%;
  object-fit: cover;
}

.back {
  transform: rotateY(180deg);
} */

/* destinations */
.destinations {
  padding: 20px;
}

.destination-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  justify-content: center;
}

@media (max-width: 768px) {
  .destination-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}
</style>
