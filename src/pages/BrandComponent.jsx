import { useQuery, gql } from "@apollo/client";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Facebook from "../assets/Facebook.png";
import Twitter from "../assets/Twitter.png";
import Instagram from "../assets/Instagram.png";
import Logo from "../assets/Logo.png";

const GET_BRANDS = gql`
  query {
    findAllBrands {
      id
      name
      image
    }
  }
`;

export default function Brands() {
  const { loading, error, data } = useQuery(GET_BRANDS);

  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "200px" }}>
        <div style={{ maxWidth: "350px" }}>
          <h2>
            Browse top quality <span class="highlight">Guitars</span> online
          </h2>
          <p>
            Explore 50k+ latest collections of branded guitars online with
            VibeStrings.
          </p>
        </div>

        <img
          src="src/assets/GuitarImage.jpg"
          alt="Guitar Image"
          style={{
            width: "672px",
            height: "586px",
            objectFit: "cover",
            objectPosition: "bottom",
            borderBottomRightRadius: "151px",
            borderBottomLeftRadius: "360px",
          }}
        />
      </div>
      <div style={{ marginTop: "100px" }}>
        <h1>
          Featuring the <span class="highlight">Best Brands</span>
        </h1>
        <p>Select your preferred brand and explore our exquisite collection</p>
      </div>
      <div className="container mt-5">
        <div className="row justify-content-center g-4">
          {data.findAllBrands.map((brand) => (
            <div key={brand.id} className="col-6 col-md-2 mb-4">
              <Link to={`/brands/${brand.id}`} className="d-block text-center">
                {brand.image ? (
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="img-fluid rounded"
                    style={{
                      maxWidth: "150px",
                      margin: "0 auto",
                      display: "block",
                    }}
                  />
                ) : (
                  <p>{brand.name}</p>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{ backgroundColor: "#121212", color: "#fff", padding: "60px 0" }}
      >
        <div className="container text-center">
          <h2 className="mb-5">
            Why try <span class="highlight">VibeStrings?</span>
          </h2>
          <div className="row justify-content-around">
            <div className="col-md-2">
              <div className="why-try">
                <img
                  src="src/assets/shapes.png"
                  alt="Shapes-Icon"
                  style={{ width: "30px", height: "30px" }}
                />
              </div>
              <h4>Smooth Browsing</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="col-md-2">
              <div className="why-try">
                <img
                  src="src/assets/truck.png"
                  alt="Truck-Icon"
                  style={{ width: "30px", height: "30px" }}
                />
              </div>
              <h4>Easy Delivery</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="col-md-2">
              <div className="why-try">
                <img
                  src="src/assets/empty-wallet-tick.png"
                  alt="Wallet-Icon"
                  style={{ width: "30px", height: "30px" }}
                />
              </div>
              <h4>Swift Payments</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid py-5" style={{ backgroundColor: "#fff" }}>
        <div className="row align-items-center">
          <div className="col-md-6 px-5">
            <h2>
              Browse and buy your{" "}
              <span class="highlight">favorite guitars</span> with VibeStrings.
            </h2>
            <button style={{ marginTop: "20px", backgroundColor: "#000" }}>
              <img src="src/assets/googlePlay.png"></img>
            </button>
            <button style={{ marginLeft: "20px", backgroundColor: "#0C0D10" }}>
              <img src="src/assets/appStore.png"></img>
            </button>
          </div>

          <div
            className="col-md-5 d-flex justify-content-center position-relative"
            style={{
              borderRadius: "500px",
              backgroundColor: "#FF6428",
              height: "400px",
            }}
          >
            <img
              src="src/assets/leftImage.png"
              alt="left image"
              style={{
                width: "180px",
                height: "400px",
                marginRight: "20px",
                paddingBottom: "40px",
              }}
            />
            <img
              src="src/assets/rightImage.png"
              alt="right image"
              style={{
                width: "180px",
                height: "400px",

                paddingTop: "40px",
              }}
            />
          </div>
        </div>
      </div>
      <footer
        className="py-4 mt-5"
        style={{ backgroundColor: "#EEE", paddingLeft: "30px" }}
      >
        <div className="container">
          <div className="row text-muted" style={{ marginTop: "30px" }}>
            <div className="col-md-3 mb-3 text-start">
              <img src={Logo} alt="Brand Logo" />
              <p className="mt-3 fw-light">Enquiry@VibeStrings.com</p>
              <p className="fw-light"> San Francisco</p>
            </div>
            <div className="col-md-3 mb-3 text-start">
              <h5 className="fw-bold">PAGES</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#!" className="text-muted fw-light">
                    Store
                  </a>
                </li>
                <li className="mb-2" i>
                  <a href="#!" className="text-muted fw-light">
                    Collections
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#!" className="text-muted fw-light">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 mb-3 text-start">
              <h5 className="fw-bold">PRODUCT</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#!" className="text-muted fw-light">
                    Terms
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#!" className="text-muted fw-light">
                    Privacy Policy
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#!" className="text-muted fw-light">
                    Copyright
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 mb-3 text-start">
              <h5 className="fw-bold">FOLLOW US</h5>
              <img
                src={Facebook}
                alt="facebook"
                style={{
                  width: "32px",
                  height: "32px",
                }}
              />
              <img
                src={Twitter}
                alt="twitter"
                style={{
                  width: "32px",
                  height: "32px",
                }}
              />
              <img
                src={Instagram}
                alt="instagram"
                style={{
                  width: "32px",
                  height: "32px",
                }}
              />
            </div>
          </div>
          <hr />
          <p className="text-center text-muted small mb-0">
            &copy; {new Date().getFullYear()} CopyrightVibeStrings
          </p>
        </div>
      </footer>
    </div>
  );
}
