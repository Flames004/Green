import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../api/axios";
import { toast } from "react-toastify";
import StarRating from "./StarRating";
import { Loader } from "./Loader";
import { CircleUser } from "lucide-react";
import ReviewCard from "./ReviewCard";

const ReviewsSection = ({ productId }) => {
  const auth = useSelector((state) => state.auth.isAuth);

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/review/get-all/${productId}`);
      setReviews(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) fetchReviews();
  }, [productId]);

  const submitReview = async () => {
    if (!auth) {
      toast.error("Please login to write a review");
      return;
    }

    if (!rating || !reviewText.trim()) {
      toast.error("Rating and review are required");
      return;
    }

    try {
      setSubmitting(true);
      await API.post(`/review/add-review/${productId}`, {
        rating,
        review: reviewText,
      });

      toast.success("Review added successfully");
      setRating(0);
      setReviewText("");
      fetchReviews();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add review");
    } finally {
      setSubmitting(false);
    }
  };

  const totalReviews = reviews.length;

  const ratingCount = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        ).toFixed(1)
      : 0;

  return (
    <div className="px-4 md:px-10 mt-10">

      
      <h1 className="text-xl md:text-3xl font-semibold text-gray-800 mb-4">
        Customer Reviews
      </h1>

      
      <div className="flex items-center gap-4 mb-8">
        <StarRating rating={Math.round(averageRating)} />
        <p className="text-sm text-gray-600">
          {averageRating} out of 5 · {totalReviews} reviews
        </p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

        
        <div className="md:col-span-2 bg-white border rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold mb-1">
            Write a Review
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Help others by sharing your experience
          </p>

          {!auth && (
            <p className="text-sm text-red-500 mb-3">
              Please login to write a review
            </p>
          )}

          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Your Rating</p>
            <StarRating
              rating={rating}
              editable
              onChange={(val) => setRating(val)}
            />
          </div>

          <textarea
            rows="4"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="What did you like or dislike?"
            className="w-full border rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
          />

          <div className="flex justify-between items-center mt-4">
            <span className="text-xs text-gray-500">
              {reviewText.length}/500
            </span>

            <button
              onClick={submitReview}
              disabled={submitting || !auth}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2 rounded-lg text-sm disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </div>

       
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            Rating Breakdown
          </h3>

          {ratingCount.map(({ star, count }) => {
            const percentage =
              totalReviews > 0 ? (count / totalReviews) * 100 : 0;

            return (
              <div key={star} className="flex items-center gap-3 mb-2">
                <span className="text-sm w-10">{star} ★</span>

                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-emerald-600 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <span className="text-sm text-gray-600 w-8">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      
      {loading ? (
        <Loader />
      ) : reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review._id} className="border-b pb-4">
              <div className="flex items-center gap-2 mb-1">
                <CircleUser size={18} />
                <StarRating rating={review.rating} />
              </div>

              <ReviewCard
                name={review.user?.name || "User"}
                time={new Date(review.createdAt).toDateString()}
                review={review.review}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
