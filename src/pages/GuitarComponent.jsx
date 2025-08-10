import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import Facebook from "../assets/Facebook.png";
import Twitter from "../assets/Twitter.png";
import Instagram from "../assets/Instagram.png";
const GET_MODEL_DETAILS = gql`
  query GetModelDetails($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      id
      name
      type
      image
      description
      price
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians {
        name
        musicianImage
        bands
      }
    }
  }
`;

export default function GuitarComponent() {
  const { brandId, modelId } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_MODEL_DETAILS, {
    variables: { brandId, modelId },
  });
  const PAGE_SIZE = 1;
  const [musiciansPage, setMusiciansPage] = useState(1);
  const [activeTab, setActiveTab] = useState("specs");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const model = data.findUniqueModel;
  const totalMusiciansPages = Math.ceil(model.musicians.length / PAGE_SIZE);

  const displayedMusicians = model.musicians.slice(
    (musiciansPage - 1) * PAGE_SIZE,
    musiciansPage * PAGE_SIZE
  );
  return (
    <div
      className="container my-4"
      style={{
        width: "1200px",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        className="btn btn-link"
        style={{
          position: "absolute",
          top: "1rem",
          left: "18%",
          color: "black",
          textDecoration: "none",
          zIndex: 1000,
        }}
      >
        ← Back
      </button>

      <div className="row align-items-center mb-4">
        <div className="col-md-7">
          <h1 className="mb-3">{model.name}</h1>
        </div>
        <div className="col-md-5 text-center">
          <div
            style={{
              background: "linear-gradient(135deg, #FF5B1C, #FF8C60)",
              borderRadius: "0 0 150px 360px",
              height: "350px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={model.image}
              alt={model.name}
              style={{
                maxHeight: "60%",
                maxWidth: "60%",
                rotate: "-45deg",
                paddingLeft: "30px",
              }}
              className="img-fluid"
            />
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          borderBottom: "2px solid #FF6428",
          marginBottom: "1rem",
          cursor: "pointer",
        }}
      >
        <button
          onClick={() => setActiveTab("specs")}
          style={{
            flex: 1,
            padding: "0.75rem",
            background: "transparent",
            color: activeTab === "specs" ? "#FF6428" : "black",
            border: "none",
            borderBottom: activeTab === "specs" ? "4px solid #FF6428" : "none",
            fontWeight: activeTab === "specs" ? "600" : "400",
            transition: "color 0.3s, border-bottom 0.3s",
          }}
        >
          Specification
        </button>

        <button
          onClick={() => setActiveTab("musicians")}
          style={{
            flex: 1,
            padding: "0.75rem",
            background: "transparent",
            color: activeTab === "musicians" ? "#FF6428" : "black",
            border: "none",
            borderBottom:
              activeTab === "musicians" ? "4px solid #FF6428" : "none",
            fontWeight: activeTab === "musicians" ? "600" : "400",
            transition: "color 0.3s, border-bottom 0.3s",
          }}
        >
          Who plays it?
        </button>
      </div>

      {activeTab === "specs" && (
        <div style={{ textAlign: "left" }}>
          <p>{model.description}</p>
          <ul style={{ maxWidth: "300px" }}>
            <li>Body Wood: {model.specs.bodyWood}</li>
            <li>Neck Wood: {model.specs.neckWood}</li>
            <li>Fingerboard: {model.specs.fingerboardWood}</li>
            <li>Pickups: {model.specs.pickups}</li>
            <li>Tuners: {model.specs.tuners}</li>
            <li>Scale Length: {model.specs.scaleLength}</li>
            <li>Bridge: {model.specs.bridge}</li>
          </ul>
        </div>
      )}

{activeTab === "musicians" && (
        <>
          <div className="row">
            {model.musicians.length === 0 && <p>No known musicians found.</p>}
            {displayedMusicians.map((musician) => (
              <div
                key={musician.name}
                className="col-6 col-md-4 col-lg-3 mb-4 text-center"
              >
                <div
                  style={{
                    width: "220px",
                    backgroundColor: "#ffefe8",
                    borderRadius: "12px",
                    padding: "10px",
                    margin: "0 auto 16px auto",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: "200px",
                      height: "200px",
                      margin: "0 auto 6px auto",
                      overflow: "hidden",
                      backgroundColor: "#ddd",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={musician.musicianImage}
                      alt={musician.name}
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <h5 style={{ margin: 0 }}>{musician.name}</h5>
                </div>
              </div>
            ))}
          </div>
          {totalMusiciansPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              {[...Array(totalMusiciansPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMusiciansPage(i + 1)}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    border: "none",
                    backgroundColor:
                      musiciansPage === i + 1 ? "#FF6428" : "#ccc",
                    cursor: "pointer",
                    padding: 0,
                  }}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          )}
        </>
      )}
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
