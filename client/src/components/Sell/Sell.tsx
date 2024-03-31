import { Link } from "react-router-dom";
import { Nav, SearchBar } from "..";
import { useAuth } from "../../context/AuthContext";
import {
  CreateProduct,
  ReadProduct,
  UpdateProduct,
  DeleteProduct,
} from "./CRUD";
import { useState } from "react";

interface SellProps {
  total: number;
}

export default function Sell({ total }: SellProps) {
  const { user, business } = useAuth();

  const [selectedBtn, setSelectedBtn] = useState("");
  const handleBtnChange = (selectedButton: string) => {
    setSelectedBtn(selectedButton);
  };

  return (
    <>
      <Nav total={total} />
      <SearchBar />

      {user?.userId && (
        <>
          <h2>Sell</h2>

          <h2>
            Register your <Link to="/register">business</Link> to start selling
          </h2>
        </>
      )}
      
      {business?.businessId != null && (
        <>
          <h2>Sell</h2>
          {SellButtons.map((sellBtn, index) => {
            return (
              <label key={index}>
                <input
                  type="radio"
                  value={sellBtn?.title}
                  placeholder={sellBtn?.title}
                  checked={selectedBtn === `${sellBtn?.title}`}
                  onChange={() => handleBtnChange(`${sellBtn?.title}`)}
                />
                {sellBtn?.title}
              </label>
            );
          })}
        </>
      )}

      {selectedBtn === "Create Product" && <CreateProduct />}
      {selectedBtn === "View Products" && <ReadProduct />}
      {selectedBtn === "Update Product" && <UpdateProduct />}
      {selectedBtn === "Delete" && <DeleteProduct />}
    </>
  );
}
const SellButtons = [
  {
    title: "Create Product",
    link: "",
    element: <CreateProduct />,
  },
  {
    title: "View Products",
    link: "",
    element: <ReadProduct />,
  },
  {
    title: "Update Product",
    link: "",
    element: <UpdateProduct />,
  },
  {
    title: "Delete",
    link: "",
    element: <DeleteProduct />,
  },
];
