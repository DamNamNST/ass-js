import ProductApi from "../../front-end/src/api/ProductApi";
import { $ } from "../../front-end/src/utils";
import axios from "axios";
import SearchBox from "../../front-end/src/pages/component/SearchBox";
import { checkEmail } from "../validation";

const Login = {
  async render() {
    return /*html*/ `
    <head>
    <title>Login</title>
    </head>
    <div class="container mb-5">
    <div class="row form-login ">
    <div class="text-center">
      <h2 class="title-login text-white">LOGIN</h2>
    </div>
    <div class ='text-danger text-center'>
    <span class="errorLogin"></span>
    </div>

    <div class="col-12">
    <form>
      <div class="container">
        <div class="mb-3">
          <label for="" class="form-label text-white">Email</label>
          <input type="text" class="form-control" id="form-login-email">
        
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label text-white">Password</label>
          <input type="password" class="form-control" id="form-login-password">
        </div>
        
        <div class="">
        <button type="submit" class="btn btn-primary mb-3 w-100" id="btn-login">Sign In</button></div>
        <div class="text-center">
        <a href="http://localhost:6868/#/registration">Bạn chưa có tài khoản ?</a>
        </div>
        <div>
        <div class="row text-center mt-3 mb-3">
        <div class="col-4">
        <i class="fab fa-facebook fs-1 text-primary"></i>
        </div>
        <div class="col-4">
        <i class="fab fa-google-plus fs-1 text-danger"></i>
              </div>
        <div class="col-4">
        <i class="fab fa-instagram-square fs-1 text-warning"></i></div>
        </div>
        </div>
      </div>
        </form>
    </div>
    </div>
      
    </div>
      `;
  },
  async afterRender() {
    $("#btn-login").addEventListener("click", async function (e) {
      e.preventDefault();
      const email = $("#form-login-email").value;
      const password = $("#form-login-password").value;
      //start valite đăng nhập

      if (email == "" || password == "") {
        document.querySelector(".errorLogin").innerHTML =
          "Vui lòng nhập thông tin tài khoản";
        return false;
      }
      if (!checkEmail(email)) {
        $(".errorLogin").innerHTML = "Vui lòng nhập đúng định dạng email";
      }
      const { data } = await ProductApi.getAccount(email, password).catch(
        function (error) {
          if (error.response) {
            $(".errorLogin").innerHTML = error.response.data.error;
          }
        }
      );
      (window.location.hash = "/"), localStorage.setItem("id", data.id);
      localStorage.setItem("username", data.name);
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.role);
      localStorage.setItem("image", data.image);
      localStorage.setItem("token", data.token);
      if (role == 0) {
        $("#dashboard-link").classList.add("show");
      } else {
        $("#dashboard-link").classList.add("hide");
      }
    });
    return `${await SearchBox.afterRender()}`;
  },
};
export default Login;
