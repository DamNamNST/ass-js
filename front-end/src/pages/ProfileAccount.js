import ProductApi from "../api/ProductApi";
import { $, parseRequestUrl } from "../utils";
import axios from "axios";
import firebase from "firebase";
import SearchBox from "./component/SearchBox";
import Header from "./component/header";

const ProfileAccount = {
  async render() {
    if (localStorage.getItem('token') == null) {
      window.location.hash = '/login'
      alert("Vui lòng đăng nhập")
    }
    const {id} = parseRequestUrl();
    const { data: account } = await ProductApi.getInfo(id);
    console.log(account);
    const showAccount = account.map((account) => {
      return /*html*/ `
         <div class="container">
           <form action="" class="mb-4">
           <div class="d-flex justify-content-center">
           <img src="${
             account.image
           }" alt="" width="200" class="border border-primary     rounded-circle  border-5  ">
           <input type="text" id="account-image-old" value="${
             account.image
           }" class=d-none>
           </div>
           <div class="d-flex justify-content-center mb-2 mt-2"><input type="file" id="account-image-update" disabled></div>
           <input type="text" id="account-name" class="form-control" disabled value="${
             account.name
           }">
           <input type="text" id="account-email" class="form-control mt-2" disabled value="${
             account.email
           }">
           <input type="password" id="account-password" class="form-control mt-2" disabled value="${
             account.password
           }">
           <input type="text" id="account-role" class="form-control mt-2" disabled value="${
             account.role == 0 ? "Quản trị " : "Khách hàng"
           }">
           <button class="btn btn-primary w-100 mt-2" id="btn-update-account">Update</button>
           </form>
         </div>
         `;
    });
    return /*html*/ `
        <title>Thông tin tài khoản</title>
        <div class="container">
       ${showAccount}
        </div>
        `;
  },
  async afterRender() {
    $("#btn-update-account").addEventListener("click", async (e) => {
      e.preventDefault();
      const usernameForm = $("#account-name");
      const passwordForm = $("#account-password");
      const numberphoneForm = $("#account-numberphone");
      const imageForm = $("#account-image-update");
      const emailForm = $("#account-email");

      const username = localStorage.getItem("username");
      const password = localStorage.getItem("password");
      const id = localStorage.getItem("id");
      if (usernameForm.disabled == true) {
        usernameForm.disabled = false;
        passwordForm.disabled = false;
        numberphoneForm.disabled = false;
        emailForm.disabled = false;
        imageForm.disabled = false;
        $("#btn-update-account").innerHTML = `Save`;
        return false;
      } else {
        usernameForm.disabled = true;
        passwordForm.disabled = true;
        numberphoneForm.disabled = true;
        imageForm.disabled = true;
        emailForm.disabled = true;
        $("#btn-update-account").innerHTML = `Update`;
        if ($("#account-image-update").value == "") {
          const data = {
            name: usernameForm.value,
            image: $("#account-image-old").value,
            email: emailForm.value,
            password: passwordForm.value,
            role: parseInt(localStorage.getItem("role")),
          };
          const data_URL = "https://headphoneapi.herokuapp.com/api/users/";
          localStorage.setItem("username", usernameForm.value);
          localStorage.setItem("password", passwordForm.value);
          localStorage.setItem("numberphone", numberphoneForm.value);
          localStorage.setItem("role" , data.role);
          axios.put(data_URL + id, data,{
            headers:{
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          });
          alert("Update thành công");
          location.reload();
        } else {
          const productImage = $("#account-image-update").files[0];
          let storageRef = firebase.storage().ref(`users/${productImage.name}`);
          storageRef.put(productImage).then(function () {
            storageRef.getDownloadURL().then((url) => {
              const data = {
                name: usernameForm.value,
                image: url,
                password: passwordForm.value,
                email: emailForm.value,
                role: parseInt(localStorage.getItem("role")),
              };
              const data_URL = "https://headphoneapi.herokuapp.com/api/users/";
              axios.put(data_URL + id, data,{
                headers:{
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
              });
              localStorage.setItem("username", usernameForm.value);
              localStorage.setItem("password", passwordForm.value);
              localStorage.setItem("image", data.image);
              localStorage.setItem("role" , data.role);
              localStorage.setItem("numberphone", numberphoneForm.value);
              alert("Update thành công");
              location.reload();
            });
          });
        }
      }
    });
    return `${await SearchBox.afterRender()}${await Header.afterRender()}`;
  },
};

export default ProfileAccount;
