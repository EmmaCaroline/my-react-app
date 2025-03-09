import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { useCart } from "../ui/CartContext";

const Product = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();
  const { dispatch } = useCart();

  useEffect(() => {
    async function getData(url) {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await fetch(url);
        const json = await response.json();

        if (json.data) {
          setData(json.data);
        } else {
          setIsError(true);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData(`https://v2.api.noroff.dev/online-shop/${id}`);
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading product.</div>;
  if (!data) return <div>Product not found.</div>;

  const fullStars = Math.floor(data.rating);
  const halfStar = data.rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: data.id,
        title: data.title,
        price: data.discountedPrice,
        image: data.image.url,
      },
    });
  };

  return (
    <div>
      <div className="flex flex-col justify-normal items-center sm:flex-row sm:justify-center sm:gap-x-8 sm:mt-4 md:gap-x-24 lg:gap-x-44 ">
        {data.image && data.image.url ? (
          <img
            src={data.image.url}
            alt={data.image.alt || "Product image"}
            className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 aspect-square object-cover rounded-lg mt-4"
          />
        ) : (
          <p>No image available</p>
        )}
        <div className="flex flex-col w-72 sm:w-auto sm:self-start group">
          <h2 className="text-lg md:text-xl font-semibold mt-2">
            {data.title}
          </h2>
          <div className="flex mt-2">
            {Array(fullStars)
              .fill(<FaStar className="text-yellow-400" />)
              .map((star, index) => (
                <span key={`full-${index}`}>{star}</span>
              ))}
            {halfStar === 1 && (
              <span key="half">
                <FaStarHalfAlt className="text-yellow-400" />
              </span>
            )}
            {Array(emptyStars)
              .fill(<FaRegStar className="text-yellow-400" />)
              .map((star, index) => (
                <span key={`empty-${index}`}>{star}</span>
              ))}
          </div>
          <p className="text-gray-700 w-56 xl:w-72 mt-2">{data.description}</p>

          <p className="text-lg font-semibold mt-4 text-gray-900">
            ${data.discountedPrice.toFixed(2)}
          </p>
          {data.price > data.discountedPrice && (
            <p className="text-sm text-red-500 line-through">
              ${data.price.toFixed(2)}
            </p>
          )}
          <button
            onClick={addToCart}
            className="bg-teal-700 text-white w-32 py-1 rounded mt-6 transition duration-300 ease-linear group-hover:scale-105"
          >
            Add to cart
          </button>
        </div>
      </div>

      {data.reviews && data.reviews.length > 0 && (
        <div className="w-full mt-6 max-w-lg mx-auto sm:max-w-xl md:max-w-[702px] lg:max-w-[790px] xl:max-w-[846px]">
          <h2 className="text-xl font-semibold mb-3">Customer Reviews</h2>
          <div className="space-y-4">
            {data.reviews.map((review) => {
              const fullStars = Math.floor(review.rating);
              const halfStar = review.rating % 1 >= 0.5 ? 1 : 0;
              const emptyStars = 5 - fullStars - halfStar;

              return (
                <div
                  key={review.id}
                  className="border p-4 rounded-lg shadow-md"
                >
                  <p className="font-semibold">{review.username}</p>
                  <div className="flex text-yellow-400">
                    {Array(fullStars)
                      .fill()
                      .map((_, i) => (
                        <FaStar key={`full-${i}`} />
                      ))}
                    {halfStar === 1 && <FaStarHalfAlt key="half-star" />}
                    {Array(emptyStars)
                      .fill()
                      .map((_, i) => (
                        <FaRegStar key={`empty-${i}`} />
                      ))}
                  </div>
                  <p className="mt-1 text-gray-700">{review.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
