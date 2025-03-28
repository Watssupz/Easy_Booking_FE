<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import VueEasyLightbox from "vue-easy-lightbox";
import { API_ENDPOINTS } from "@/constant/apiConstants";

export default {
  name: "Details",
  components: {
    Header,
    Footer,
    VueEasyLightbox,
  },
  data() {
    return {
      rid: null,
      visible: false,
      lightboxIndex: 0,
      search: {
        destination: "",
        checkIn: "",
        checkOut: "",
        guests: 2,
      },
      hotel: {
        name: "",
        address: "",
        images: [],
        amenities: [],
        status: null,
        pricepernight: "199$",
        description: "",
      },
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.1817513153887!2d105.85380007613769!3d21.0254124806231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abeb98f8b54d%3A0x90d6982234a65f25!2sSofitel%20Legend%20Metropole%20Hanoi!5e0!3m2!1sen!2s!4v1740630776600!5m2!1sen!2s",
    };
  },
  created() {
    this.rid = this.$route.params.id; // Lấy ID từ URL
    console.log("Room ID:", this.rid); // Kiểm tra giá trị ID
    this.fetchRoomFeaturesData();
    this.fetchRoomData();
    this.fetchRoomMedia();
  },
  methods: {
    showLightbox(index) {
      this.lightboxIndex = index;
      this.visible = true;
    },
    async fetchRoomFeaturesData() {
      try {
        const response = await fetch(
          `${API_ENDPOINTS.FEATURE_BY_ROOM_ID}${this.rid}`,
          {
            method: "GET",
            headers: {
              accept: "*/*",
            },
          }
        );
        if (!response.ok) {
          this.$message.error("Lấy dữ liệu thất bại");
        }
        const result = await response.json();
        this.hotel.amenities = result.data;
      } catch (error) {
        this.$message.error("Lỗi dữ liệu Features");
      }
    },
    async fetchRoomData() {
      try {
        const response = await fetch(
          `${API_ENDPOINTS.GET_ROOM_BY_ID}${this.rid}`,
          {
            method: "GET",
            headers: {
              accept: "*/*",
            },
          }
        );
        if (!response.ok) {
          this.$message.error("Lấy dữ liệu thất bại");
        }
        const result = await response.json();
        console.log("Room Data:", result);
        this.hotel.name = result.data.room.room_number;
        this.hotel.address = result.data.room.location;
        this.hotel.pricepernight = result.data.room.price_per_night;
        this.hotel.description = result.data.room.description;
        this.hotel.status = result.data.room.room_status_id;
        // Kiểm tra và xử lý thumbnail
        this.hotel.images = []; // Khởi tạo mảng rỗng mặc định
        if (result.data.room.thumbnail) {
          // Chỉ thêm nếu thumbnail tồn tại
          this.hotel.images = [result.data.room.thumbnail];
        }
      } catch (error) {
        this.$message.error("Lỗi ảnh");
      }
    },
    async fetchRoomMedia() {
      try {
        const response = await fetch(
          `${API_ENDPOINTS.GET_MEDIA_ROOM}${this.rid}`,
          {
            method: "GET",
            headers: {
              accept: "*/*",
            },
          }
        );
        if (!response.ok) {
          this.$message.error("Lấy dữ liệu thất bại");
        }
        const result = await response.json();

        // Kiểm tra nếu result.data tồn tại và là mảng
        if (result.data && Array.isArray(result.data)) {
          result.data.forEach((item) => {
            if (item.picture) {
              // Chỉ thêm nếu picture tồn tại
              const imageUrl = `data:image/png;base64,${item.picture}`;
              this.hotel.images.push(imageUrl);
            }
          });
        }
      } catch (error) {
        this.$message.error("Lỗi1");
      }
    },
  },
};
</script>
<template>
  <div>
    <!-- Header -->
    <Header />
    <div class="container mt-5">
      <aside class="sidebar">
        <h1>
          {{ hotel.name }}
        </h1>
        <p class="d-flex align-items-center">
          <img
            style="height: 1em; vertical-align: middle"
            src="@/assets/icons/location.png"
            alt=""
          />
          {{ hotel.address }}
        </p>
        <!-- Bản đồ -->
        <div class="map-container">
          <iframe
            :src="mapUrl"
            width="100%"
            height="250"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </aside>
      <!-- tên khách sạn -->
      <main class="details-content">
        <div class="status-price">
          <div class="status-price-left">
            <h3>
              Status: <span class="status">{{ hotel.status }}</span>
            </h3>
            <h3>
              Price:
              <span class="price">{{ hotel.pricepernight }} VND</span> / 1 đêm
            </h3>
            <!-- <h3>
              Số người: <span class="guests"> {{ search.guests }}</span
              >/ Phòng
            </h3> -->
          </div>
          <div class="status-price-right">
            <button class="book-btn">Book Now</button>
          </div>
        </div>
        <!-- Hình ảnh khách sạn -->
        <div class="hotel-gallery">
          <div class="main-image">
            <img
              :src="hotel.images[0]"
              alt="Main Image"
              class="large-image"
              @click="showLightbox(0)"
            />
          </div>
          <div class="grid-images">
            <img
              v-for="(image, index) in hotel.images.slice(1, 5)"
              :key="index"
              :src="image"
              alt="Gallery Image"
              class="small-image"
              @click="showLightbox(index + 1)"
            />
            <div
              class="more-images"
              v-if="hotel.images.length > 5"
              @click="showLightbox(5)"
            >
              <img
                :src="hotel.images[5]"
                alt="More Images"
                class="small-image opacity"
              />
              <div class="overlay">+{{ hotel.images.length - 6 }} ảnh</div>
            </div>
          </div>

          <!-- Vue Easy Lightbox -->
          <vue-easy-lightbox
            :visible="visible"
            :imgs="hotel.images"
            :index="lightboxIndex"
            @hide="visible = false"
            class="lightbox-custom"
          />
        </div>
      </main>
    </div>
    <div class="hotel-info">
      <!-- Tiện ích -->
      <h3>Features</h3>
      <div class="amenities">
        <div v-for="amenity in hotel.amenities" :key="amenity" class="amenity">
          {{ amenity }}
        </div>
      </div>
      <h3>Description</h3>
      <p class="description" v-html="hotel.description"></p>

      <!-- Điểm nổi bật -->
      <!-- <section class="highlights">
        <h3>Điểm nổi bật của chỗ nghỉ</h3>
        <ul>
          <li v-for="highlight in hotel.highlights" :key="highlight">
            {{ highlight }}
          </li>
        </ul>
      </section> -->
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  gap: 20px;
}
.sidebar {
  width: 30%;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 5px;
}
.map-container {
  margin-top: 10px;
}
.details-content {
  width: 75%;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.book-btn {
  background: #007bff;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.amenities {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0;
}
.amenity {
  background: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
}
.highlights ul {
  padding-left: 20px;
}
.input-box {
  display: block;
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.search-btn {
  width: 100%;
  background: #28a745;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
/* ảnh hotel */
.hotel-gallery {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 10px;
}
.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}
.grid-images {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
.small-image {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
}
.more-images {
  position: relative;
}
.opacity {
  opacity: 0.5;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 18px;
  font-weight: bold;
}
/* làm mờ ảnh trong lightbox */
.lightbox-custom {
  background: rgba(0, 0, 0, 0.7) !important; /* Tăng độ tối và mờ nền */
  backdrop-filter: blur(8px); /* Làm mờ nền phía sau */
}

/* thông tin chi tiết phòng  */
.hotel-info {
  max-width: 96%; /* Điều chỉnh kích thước theo mong muốn */
  margin: 0 auto; /* Căn giữa */
  text-align: left;
  background: white;
  padding: 20px;
  border-radius: 8px;
}
/* giá và status */
.status-price {
  display: flex;
  justify-content: space-between; /* Đẩy trạng thái/giá sang trái và nút sang phải */
  align-items: center; /* Căn giữa theo chiều dọc */
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.status-price-left {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left; /* Căn trái nội dung */
}

.status-price-left h3 {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

.status-price .status {
  color: #28a745; /* Màu xanh lá để hiển thị trạng thái tốt */
  font-size: 22px;
}

.status-price .price {
  font-size: 22px;
  font-weight: bold;
}

.status-price-right {
  display: flex;
  align-items: center;
}

.book-btn {
  background: #007bff; /* Màu xanh dương cho nút */
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s; /* Hiệu ứng chuyển màu khi hover */
}

.book-btn:hover {
  background: #0056b3; /* Màu đậm hơn khi hover */
}
.status-price-left .guests {
  font-size: 22px;
  font-weight: bold;
}
</style>
