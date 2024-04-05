import { useAuth } from "../../../context/AuthContext";

export default function ReadProduct() {
  const { business } = useAuth();

  const businesssProductMock = [
    {
      _id: "",
      id: 0,
      quantity: 0,
      name: "Product Mock",
      img: "mockurl",
      price: 20,
      category: " Category Mock",
      parent: "Parent Mock",
      businessId: business?.businessId,
      file: [],
    },
  ];
    return (
      <div>
      <h2>All Business Products</h2>
      {business?.businessId && (
        <>
          <div>
            {businesssProductMock.map((product, index) => {
              return (
                <>
                  <span>ID: {product.id}</span>
                  <span>Business ID: {product.businessId}</span>
                  <span>Name: {product.name}</span>
                  <span>Image: {product.img}</span>
                  <span>Parent: {product.parent}</span>
                  <span>Category: {product.category}</span>
                  <span>File: {product.file}</span>
                  <span>Price: {product.price}</span>
                  <span>Quantity: {product.quantity}</span>
                </>
              );
            })}
          </div>
        </>
      )}
    </div>
    )
  }
 