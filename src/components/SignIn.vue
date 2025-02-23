<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const data = {
      form: {
        email: "",
        password: "",
      },
    };

    const methods = {
      async SignIn() {
        // Nên đổi tên thành SignIn
        try {
          const response = await fetch("https://localhost:7210/api/AC/SignIn", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data.form),
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error("API Error:", response.status, errorText);

            try {
              const errorJson = JSON.parse(errorText);
              alert(
                errorJson.message ||
                  "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin."
              );
            } catch (parseError) {
              alert("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
            }
            throw new Error(
              `HTTP error! status: ${response.status}, message: ${errorText}`
            );
          }

          const result = await response.json();
          console.log("Đăng nhập thành công:", result);

          if (result.data) {
            localStorage.setItem("token", result.data);

            // Chuyển hướng đến trang home
            router.push("/home");
          } else {
            console.error("Invalid response: missing 'data' field", result);
            alert("Lỗi đăng nhập. Dữ liệu trả về không hợp lệ.");
          }
        } catch (error) {
          console.error("Lỗi khi đăng nhập:", error);
          alert("Lỗi đăng nhập. Vui lòng thử lại sau.");
        }
      },
    };

    return {
      form: data.form,
      SignIn: methods.SignIn,
    };
  },
};
</script>

<template>
  <div class="login-wrapper">
    <section>
      <form @submit.prevent="SignIn">
        <h1>Login</h1>
        <div class="inputbox">
          <i class="fa-regular fa-envelope"></i>
          <img src="@/assets/icons/email.png" alt="" />
          <input type="email" v-model="form.email" required />
          <label for="">Email</label>
        </div>

        <div class="inputbox">
          <i class="fa-solid fa-lock"></i>
          <img src="@/assets/icons/padlock.png" alt="" />
          <input type="password" v-model="form.password" required />
          <label for="">Password</label>
        </div>

        <div class="forget">
          <div class="remember-me">
            <label for=""><input type="checkbox" />Remember Me</label>
          </div>
          <a href="#">Forget Password</a>
        </div>

        <button @click="SignIn">Sign in</button>

        <div class="register">
          <p>Don't have an account? <a href="/sign-up">Sign up now</a></p>
        </div>
      </form>
    </section>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "poppins", "sans-serif";
}

.login-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background-image: url("@/assets/bg-login.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

section {
  position: relative;
  max-width: 400px;
  width: 100%;
  background-color: transparent;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(55px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 3rem;
  box-sizing: border-box;
}

h1 {
  font-size: 2rem;
  color: #fff;
  text-align: center;
}

.inputbox {
  position: relative;
  margin: 30px 0;
  max-width: 310px;
  border-bottom: 2px solid #fff;
}

.inputbox label {
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  font-size: 1rem;
  pointer-events: none;
  transition: all 0.5s ease-in-out;
}

input:focus ~ label,
input:valid ~ label {
  top: -5px;
}

.inputbox input {
  width: 100%;
  height: 60px;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 0 35px 0 5px;
  color: #fff;
}

.inputbox img {
  position: absolute;
  right: 8px;
  width: 10%;
  color: #fff;
  font-size: 1.2rem;
  top: 20px;
}

.remember-me label {
  display: flex;
}

.forget {
  margin: 35px 0;
  font-size: 0.85rem;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.forget a {
  color: #fff;
  text-decoration: none;
  font-weight: 600;
}

.forget a:hover {
  text-decoration: underline;
}

button {
  width: 100%;
  height: 40px;
  border-radius: 40px;
  background-color: rgb(255, 255, 255, 1);
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.4s ease;
}

button:hover {
  background-color: rgb(255, 255, 255, 0.5);
}

.register {
  font-size: 0.9rem;
  color: #fff;
  text-align: center;
  margin: 25px 0 10px;
}

.register p a {
  text-decoration: none;
  color: #fff;
  font-weight: 600;
}

.register p a:hover {
  text-decoration: underline;
}
</style>
