<script>
export default {
  name: "Headerbar",
  data() {
    return {
      isAuthenticated: false,
    };
  },
  mounted() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem("token");
      this.isAuthenticated = !!token;
    },
    logout() {
      localStorage.removeItem("token");
      this.isAuthenticated = false;
      this.$router.push("/sign-in");
    },
  },
};
</script>

<template>
  <header>
    <nav>
      <ul class="m-0">
        <li class="left">
          <router-link to="/home">Home</router-link>
        </li>
        <div class="right">
          <li>
            <router-link to="/about">About</router-link>
          </li>
          <li>
            <router-link to="/contact">Contact</router-link>
          </li>
          <li v-if="!isAuthenticated">
            <router-link to="/sign-in" class="signinupBtn">Sign in</router-link>
          </li>
          <li v-if="!isAuthenticated">
            <router-link to="/sign-up" class="signinupBtn">Sign up</router-link>
          </li>
          <li v-if="isAuthenticated">
            <router-link to="/sign-in" class="logout" @click.prevent="logout">
              <!-- Logout -->
              <img src="@/assets/icons/logout.png" alt="Logout" class="" />
            </router-link>
          </li>
        </div>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  background-color: #765341;
  color: white;
  padding: 10px 0;
  z-index: 1000;
}

body {
  margin-top: 60px;
}

nav {
  padding: 0 7%;
}

nav ul {
  display: flex;
  list-style: none;
  padding: 0;
  width: 100%;
  justify-content: space-between;
}

nav ul .right {
  display: flex;
}

nav ul li.left {
  margin-right: auto;
}

nav ul li {
  margin-right: 10px;
}

nav ul li a {
  color: white;
  text-decoration: none;
  font-size: 16px;
}

nav ul li a {
  display: inline-block;
  background-color: #765341;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  text-align: center;
  transition: background-color 0.3s;
}

nav ul li a:hover {
  background-color: #6a4a3a;
  color: white;
  transform: scale(1.05);
}

.signinupBtn {
  background-color: white;
  color: #765341;
}

.logout img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-right: 5px;
}

@media (max-width: 768px) {
  nav ul li a {
    font-size: 1.5vw;
    padding: 0.8vh 1.5vw;
  }

  .logout img {
    width: 2vw;
    height: 2vw;
  }

  nav ul {
    justify-content: center;
  }

  nav ul li {
    margin: 0.5vh 0.5vw;
  }
}

@media (max-width: 576px) {
  nav ul li a {
    font-size: 2vw;
    padding: 0.5vh 1vw;
  }

  .logout img {
    width: 2.5vw;
    height: 2.5vw;
  }
}
</style>
