import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../api/axios";
import { toast } from "react-toastify";
import StarRating from "./StarRating";
import { Loader } from "./Loader";
import { CircleUser } from "lucide-react";

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
      setRating(0);
      setReviewText("");
      fetchReviews();
    } finally {
      setSubmitting(false);
    }
  };

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        ).toFixed(1)
      : "0.0";

  return (
    <section className="max-w-7xl mx-auto px-2 md:px-6 py-8">
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900">
          Reviews & Ratings
        </h2>

        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-gray-900">
              {averageRating}
            </span>
            <StarRating rating={Math.round(averageRating)} />
          </div>

          <span className="text-sm text-gray-500">
            {totalReviews} reviews
          </span>
        </div>
      </div>

      <div className="border-b pb-6 mb-8">
        <p className="text-sm font-medium text-gray-800 mb-3">
          Rate your experience
        </p>

        <StarRating
          rating={rating}
          editable
          onChange={(val) => setRating(val)}
        />

        <textarea
          rows="3"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here..."
          className="w-full mt-4 resize-none rounded-md border border-gray-300 p-3 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
        />

        <div className="flex justify-between items-center mt-3">
          <span className="text-xs text-gray-400">
            {reviewText.length}/500
          </span>

          <button
            onClick={submitReview}
            disabled={submitting || !auth}
            className="text-sm font-medium text-emerald-700 hover:text-emerald-800 disabled:text-gray-400"
          >
            {submitting ? "Posting..." : "Post Review"}
          </button>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : reviews.length === 0 ? (
        <p className="text-sm text-gray-500">
          No reviews yet. Be the first to share your experience.
        </p>
      ) : (
        <div className="space-y-8">
          {reviews.map((review) => (
            <div key={review._id} className="border-b pb-6">
              <div className="flex items-start gap-3">
                <CircleUser className="text-gray-400 mt-1" size={22} />

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <StarRating rating={review.rating} />
                    <span className="text-xs text-gray-400">
                      {new Date(review.createdAt).toDateString()}
                    </span>
                  </div>

                  <p className="text-sm text-gray-800 leading-relaxed">
                    {review.review}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    — {review.user?.name || "Anonymous"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ReviewsSection;
