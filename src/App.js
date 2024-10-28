import "./App.css";

import "../src/assets/images/favicon.ico";
import "../src/assets/css/bootstrap.min.css";
import "../src/assets/css/icons.min.css";
import "../src/assets/css/app.min.css";
import "../src/assets/css/custom.min.css";
import Home from "./Componnets/Home";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "./Componnets/Authentication/Login";
import Listproduct from "./Componnets/Product/Listproduct";
import Header from "./Componnets/Header";
import AddProduct from "./Componnets/Product/AddProduct";
import Category from "./Componnets/Category/Category";
import OrderList from "./Componnets/Order/OrderList";
import Transaction from "./Componnets/Transaction/Transaction";
import OrderDetail from "./Componnets/Order/OrderDetail";
import Customer from "./Componnets/Customer/Customer";
import Banner from "./Componnets/GenralSetting/Banners/Banner";
import Tax from "./Componnets/GenralSetting/Tax";
import Team from "./Componnets/Team/Team";
import Coupon from "./Componnets/GenralSetting/Coupon";
import Section2 from "./Componnets/GenralSetting/Banners/Section2";
import Section3 from "./Componnets/GenralSetting/Banners/Section3";
import Section4 from "./Componnets/GenralSetting/Banners/Section4";
import Sliderlist from "./Componnets/GenralSetting/Slider/Sliderlist";
import Addslider from "./Componnets/GenralSetting/Slider/AddSlider";
import Notification from "./Componnets/GenralSetting/Notification";
import Faq from "./Componnets/GenralSetting/Faq";
import PrivacyPolicy from "./Componnets/GenralSetting/Privacypolicy";
import Termsandcondition from "./Componnets/GenralSetting/Termandcondition";
import ReturnPolicy from "./Componnets/GenralSetting/ReturnPolicy";
import ListBlog from "./Componnets/GenralSetting/Blogs/ListBlog";
import Addblogs from "./Componnets/GenralSetting/Blogs/Addblogs";
import Inquiry from "./Componnets/GenralSetting/Inquiry";
import ProductDetail from "./Componnets/Product/ProductDetail";

import Testimonial from "./Componnets/GenralSetting/Testimonial";
import Review from "./Componnets/Product/Review";
import EditProduct from "./Componnets/Product/EditProduct";
import EditSlider from "./Componnets/GenralSetting/Slider/EditSlider";
import EditBlogs from "./Componnets/GenralSetting/Blogs/EditBlogs";
import Lockscreen from "./Componnets/SiteSetting/Lockscreen";
import ForgotPassword from "./Componnets/Authentication/ForgotPassword";
import Resetpassword from "./Componnets/Authentication/Resetpassword";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/Staff/login" element={<Login />} />
            <Route path="/Lock" element={<Lockscreen />}></Route>
            <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
            <Route
              path="/reset_password/:id/:token"
              element={<Resetpassword />}
            ></Route>
          </Route>
          <Route
            element={
              <>
                <Header /> <Outlet />
              </>
            }
          >
            <Route path="/" element={<Home />}></Route>
            <Route path="/Product" element={<Listproduct />}></Route>
            <Route path="/Product/:id" element={<ProductDetail />} />
            <Route path="/EditProduct/:id" element={<EditProduct />} />
            <Route path="/AddProduct" element={<AddProduct />}></Route>
            <Route path="/Categories" element={<Category />}></Route>
            <Route path="/Order" element={<OrderList />}></Route>
            <Route path="/order/:id" element={<OrderDetail />}></Route>
            <Route path="/transaction" element={<Transaction />}></Route>
            <Route path="/customer" element={<Customer />}></Route>
            <Route path="/banner" element={<Banner />}></Route>
            <Route path="/Slider" element={<Sliderlist />}></Route>
            <Route path="/addslider" element={<Addslider />}></Route>
            <Route path="/edit/:id" element={<EditSlider />}></Route>
            <Route path="/bannersection2" element={<Section2 />}></Route>
            <Route path="/bannersection3" element={<Section3 />}></Route>
            <Route path="/bannersection4" element={<Section4 />}></Route>
            <Route path="/Tax" element={<Tax />}></Route>
            <Route path="/team" element={<Team />}></Route>
            <Route path="/Coupon" element={<Coupon />}></Route>
            <Route path="/Notification" element={<Notification />}></Route>
            <Route path="/pages-faqs" element={<Faq />}></Route>
            <Route path="/ReturnPolicy" element={<ReturnPolicy />}></Route>
            <Route path="/Bloges" element={<ListBlog />}></Route>
            <Route path="/Addblogs" element={<Addblogs />}></Route>
            <Route path="/Editblog/:id" element={<EditBlogs />}></Route>
            <Route path="/InquiryList" element={<Inquiry />}></Route>
            <Route path="/Testimonial" element={<Testimonial />}></Route>
            <Route path="/review" element={<Review />}></Route>
            <Route
              path="/pages-term-conditions"
              element={<Termsandcondition />}
            ></Route>
            <Route
              path="/pages-privacy-policy"
              element={<PrivacyPolicy />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
