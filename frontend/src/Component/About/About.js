import React from "react";
import "./About.css";
import Base from "../../Base/Base";
import images from "../../images/logo.jpg";

export default function About() {
  
  return (
    <Base>
      <div className="about-container">
        <div className="about-box">
          <div className="about-logo-space">
            <div className="d-flex align-items-center">
              <figure className="avatar mr-3 item-rtl">
                <img
                  src={images}
                  alt="Avatar"
                  className="about-logo"
                />
              </figure>
            </div>
          </div>
          <div className="about-app-name">
            <h5>GoShop</h5>
          </div>
          <div className="about-description">
            <p>
              Welcome to Go Shop, your one-stop destination for a seamless
              online shopping experience. Our platform is designed to
              revolutionize the way you shop by bringing buyers and sellers
              closer together through an interactive chat feature.Browse through a diverse range of products from
              various sellers, ranging from fashion and electronics to home
              decor and more. With a wide array of options, you're sure to find
              the perfect items that suit your preferences and needs.Our intuitive interface allows
              you to create a personalized profile, making it easier to discover
              products tailored to your interests. Save your favorite items,
              track your orders, and receive recommendations based on your
              browsing history.Experience
              the convenience of chatting directly with product sellers. Got
              questions about a specific item? Need more details or
              customization options? Our integrated chat feature enables
              real-time communication between buyers and sellers, fostering a
              transparent and personalized shopping experience. Secure
              Transactions: Rest assured, we prioritize your security. Our
              platform employs state-of-the-art encryption technology to
              safeguard your personal information and ensure secure
              transactions. Shop with confidence, knowing that your data is
              protected.Make informed decisions by
              checking seller ratings and reviews. Get insights from other
              buyers about their experiences, helping you choose reputable
              sellers and high-quality products.Once you've made a purchase, stay informed about the status of
              your order with our tracking system. Receive real-time updates on
              shipping and delivery, ensuring you know exactly when to expect
              your package.Shop on the go with our mobile-friendly design. Our website is optimized for a seamless
              experience on smartphones and tablets, making it convenient for
              you to explore, chat, and purchase wherever you are. At Go Shop Application, we're committed to providing a dynamic and
              interactive shopping experience. Join our community of buyers and
              sellers today and elevate your online shopping journey to new
              heights!
            </p>
          </div>
          <div className="about-founder-name">
            <h5><b>Founders</b></h5>
            <h6>Maniyarasan Danasekaran || Karthikeyan Maruthan</h6>
          </div>
          <div className="about-copyright">©GoShop@2024</div>
        </div>
      </div>
    </Base>
  );
}
