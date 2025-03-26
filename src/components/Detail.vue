<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import VueEasyLightbox from "vue-easy-lightbox";

export default {
  name: "Details",
  components: {
    Header,
    Footer,
    VueEasyLightbox,
  },
  data() {
    return {
      visible: false,
      lightboxIndex: 0,
      search: {
        destination: "",
        checkIn: "",
        checkOut: "",
        guests: 2,
      },
      hotel: {
        name: "Căn hộ Condotel 5 Sao The Sóng Vũng Tàu",
        address: "29 Đường Thi Sách, 790000 Vũng Tàu, Việt Nam",
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/624791959.jpg?k=df693d59ea2abf17f7b09b7b170b7096aee6ddcaeffcd333d8789fbb5af67326&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/624798505.jpg?k=40a26db9432cc206170c1b00ca0bf11771f08638c613382970806a67cb20ccf1&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/624426940.jpg?k=0723c13969c6362a703d929c9d0ffc6a13023d3342422879548c6531e3a370d5&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/624798391.jpg?k=2863b96f9942e1a18df41ce9c4ff44e00d2bb07154ba4978052a3240f46fb458&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/624433394.jpg?k=b84429919c62bbb353bc7a62f361f612ca93da91466e26ba7e7efb18e6257409&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/624419722.jpg?k=217f9268d2b84da3179a0b4342ad8a200b3b705e328e00da39ec37ec22cf1e02&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/624798410.jpg?k=7617fa577a63c1ea153c67a12e08eab30d08e75c642815d987b2e58b2ac95419&o=&hp=1",
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/624791894.jpg?k=f881635559dc0e1b223ff938df24d2a37c4eedd055b5bf2997a47c3930598577&o=&hp=1",
        ],
        amenities: [
          "Wifi",
          "Điều hòa",
          "Bàn làm việc",
          "Tủ lạnh mini",
          "Chỗ đỗ xe",
          "Hồ bơi",
          "Nhà hàng",
          "Spa",
          "Phòng tắm riêng",
          "Trung tâm thể dục",
          "Bồn tắm",
          "Quầy bar",
          "Dịch vụ phòng",
          "Nhà bếp",
          "Đưa đón sân bay",
          "Phòng gia đình",
          "Tiệc BBQ",
          "Thân thiện với thú cưng",
          "Giường ngủ thoải mái",

          // {name:"Wifi", icon:"wifi.png"},
          // {name:"Điều hoà", icon:"dieuhoa.png"}
        ],
        status: ["Còn phòng", "Đang hết"],
        pricepernight: "199$",

        description:
          "Bạn có thể đủ điều kiện hưởng giảm giá Genius tại CĂN HỘ CONDOTEL 5 SAO THE SÓNG VŨNG TÀU - Apartment 5 Star Luxury The Sóng Vung Tau.<br> " +
          "Để biết giảm giá Genius có áp Nhìn ra biển, CĂN HỘ CONDOTEL 5 SAO THE SÓNG VŨNG TÀU - Apartment 5 Star Luxury The Sóng Vung Tau ở Vũng Tàu cung cấp chỗ nghỉ có hồ bơi ngoài trời, khu vườn và phòng chờ chung. Chỗ đậu xe riêng có sẵn trong khuôn viên. cho ngày bạn đã chọn hay không, hãy đăng nhập.<br> " +
          "Giảm Căn hộ có sân hiên nơi khách có thể nhìn ra thành phố, khu vực ghế ngồi, TV màn hình phẳng truyền hình vệ tinh, bếp đầy đủ tiện nghi gồm tủ lạnh và lò vi sóng, cùng phòng tắm riêng được trang bị vòi xịt/chậu rửa vệ sinh và đồ vệ sinh cá nhân miễn phí. Mỗi căn đều được thiết kế có ban công nhìn ra núi. Genius tại chỗ nghỉ này tùy thuộc vào ngày đặt phòng, ngày lưu trú và các ưu đãi có sẵn khác.<br>" +
          "Nhìn ra CĂN HỘ CONDOTEL 5 SAO THE SÓNG VŨNG TÀU - Apartment 5 Star Luxury The Sóng Vung Tau có phòng xông hơi khô., CĂN HỘ CONDOTEL 5 SAO THE SÓNG VŨNG TÀU - Apartment 5 Star Luxury The Sóng Vung Tau ở Vũng Tàu cung cấp chỗ nghỉ có hồ bơi ngoài trời, khu vườn và phòng chờ chung.<br> " +
          "Chỗ đậu xe riêng Khách có thể ghé công viên nước và sử dụng sân chơi trẻ em tại chỗ nghỉ sẵn trong khuôn viên.<br>" +
          "CĂN HỘ CONDOTEL 5 SAO THE SÓNG VŨNG TÀU - Apartment 5 Star Luxury The Sóng Vung Tau cách Bãi Sau 9 phút đi bộ và Tượng Chúa Ki-tô 3.4 km. Chỗ nghỉ cách Sân bay Quốc tế Tân Sơn Nhất 99 km và cung cấp dịch vụ đưa đón sân bay mất phí.<br>" +
          "Các cặp đôi đặc biệt thích vị trí tuyệt vời — họ cho điểm 9,0 khi đánh giá chuyến đi hai người.<br>",
        highlights: [
          "Nằm ở trung tâm Vũng Tàu",
          "Gần bãi biển",
          "Có hồ bơi ngoài trời",
          "Dịch vụ phòng chuyên nghiệp",
        ],
      },
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.1817513153887!2d105.85380007613769!3d21.0254124806231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abeb98f8b54d%3A0x90d6982234a65f25!2sSofitel%20Legend%20Metropole%20Hanoi!5e0!3m2!1sen!2s!4v1740630776600!5m2!1sen!2s",
    };
  },
  methods: {
    showLightbox(index) {
      this.lightboxIndex = index;
      this.visible = true;
    },
  },
};
</script>
<template>
  <div>
    <!-- Header -->
    <Header />
    <div class="container">
      <aside class="sidebar">
        <h1>
          {{ hotel.name }}
        </h1>
        <p>📍 {{ hotel.address }}</p>
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
              Trạng thái: <span class="status">{{ hotel.status[0] }}</span>
            </h3>
            <h3>
              Giá: <span class="price">{{ hotel.pricepernight }}</span> / 1 đêm
            </h3>
            <h3>
              Số người: <span class="guests"> {{ search.guests }}</span
              >/ Phòng
            </h3>
          </div>
          <div class="status-price-right">
            <button class="book-btn">Đặt phòng ngay</button>
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
      <div class="amenities">
        <div v-for="amenity in hotel.amenities" :key="amenity" class="amenity">
          <span class="icon"></span> {{ amenity }}
        </div>
      </div>
      <!-- <div v-for="(amenity, index) in hotel.amenities" :key="index" class="amenity">
           <img :src="require(`@/assets/icon/${amenity.icon}`)" alt="icon" class="icon"/>
            <span>{{ amenity.name }}</span>
         </div> -->
      <h3>Mô tả</h3>
      <p class="description" v-html="hotel.description"></p>

      <!-- Điểm nổi bật -->
      <section class="highlights">
        <h3>Điểm nổi bật của chỗ nghỉ</h3>
        <ul>
          <li v-for="highlight in hotel.highlights" :key="highlight">
            {{ highlight }}
          </li>
        </ul>
      </section>
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
