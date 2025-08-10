import { useQuery, gql } from "@apollo/client";

const GET_BRANDS = gql`
  query {
    findAllBrands {
      id
      name
      origin
    }
  }
`;

export default function Brands() {
  const { loading, error, data } = useQuery(GET_BRANDS);

  console.log("Loading:", loading);
  console.log("Error:", error);
  console.log("Data:", data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.findAllBrands.map((brand) => (
        <li key={brand.id}>{brand.name} ({brand.origin})</li>
      ))}
    </ul>
  );
}
