import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Facebook from "../assets/Facebook.png";
import Twitter from "../assets/Twitter.png";
import Instagram from "../assets/Instagram.png";
import Logo from "../assets/Logo.png";
const GET_BRAND_AND_MODELS = gql`
  query GetBrandAndModels($id: ID!, $sortBy: sortBy!) {
    findUniqueBrand(id: $id) {
      name
      image
    }
    findBrandModels(id: $id, sortBy: $sortBy) {
      id
      name
      type
      price
      image
    }
  }
`;

export default function BrandModels() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("");
  const { brandId } = useParams();
  const PAGE_SIZE = 2;
  const [page, setPage] = React.useState(1);
  const { loading, error, data } = useQuery(GET_BRAND_AND_MODELS, {
    variables: { id: brandId, sortBy: { field: "name", order: "ASC" } },
  });

  const guitarTypes = React.useMemo(() => {
    if (!data) return [];
    const types = data.findBrandModels.map((model) => model.type);
    return Array.from(new Set(types));
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const filteredModels = data.findBrandModels.filter((model) => {
    const matchesName = model.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = typeFilter ? model.type === typeFilter : true;
    return matchesName && matchesType;
  });
  const pagedModels = filteredModels.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
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
      <div style={{ display: "flex", alignItems: "center", gap: "330px" }}>
        <div style={{ maxWidth: "350px" }}>
          <h2>
            Play like a <span class="highlight">Rock star</span>
          </h2>
          <p>
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
            ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
          </p>
        </div>

        <div
          className="col-md-5 d-flex justify-content-center align-items-center position-relative"
          style={{
            borderBottomRightRadius: "151px",
            borderBottomLeftRadius: "360px",
            background: "linear-gradient(to top, #FF5B1C, #FF8C60)",
            height: "400px",
          }}
        >
          <img
            src={data.findUniqueBrand.image}
            alt={data.findUniqueBrand.name}
            style={{
              maxWidth: "60%",
              maxHeight: "50%",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
      <h1 className="mb-4">
        Check out the <span class="highlight">Selection</span>
      </h1>

      <div className="d-flex mb-4 gap-3 justify-content-center align-items-center">
        <select
          className="form-select w-auto"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          aria-label="Filter by guitar type"
        >
          <option value="">Filter by type</option>
          {guitarTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <input
          type="search"
          className="form-control w-auto"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search by guitar name"
        />
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {pagedModels.map((model) => (
          <div key={model.id} className="col">
            <Link
              to={`/brands/${brandId}/models/${model.id}`}
              className="text-decoration-none text-dark"
            >
              <div className="card h-100 border-0 shadow-sm">
                {model.image && (
                  <img
                    src={model.image}
                    className="card-img-top"
                    alt={model.name}
                    style={{ objectFit: "contain", height: "150px" }}
                  />
                )}
                <div className="card-body p-3 text-center">
                  <h5 className="card-title mb-2">{model.name}</h5>
                  <p className="card-text mb-1 text-muted">{model.type}</p>
                  <p className="card-text fw-bold">
                    ${model.price?.toLocaleString()}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center my-4">
        <button
          className="btn btn-outline-primary me-2"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <button
          className="btn btn-outline-primary"
          disabled={page * PAGE_SIZE >= filteredModels.length}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
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
