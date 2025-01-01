"use client"
import { IReview } from "@/modals/review.model";
import { getReviewsFromServer } from "@/server-functions/review";
import { create } from "zustand";

interface ReviewsStore {
    reviews: IReview[];
    review: IReview;
    ratings:  {
        _id: null;
        totalRating: number;
        averageRating: number;
        reviewCount: number;
    },
    page: number;
    totalReviews: number;
    increasePage: () => void;
    getReviews(arg0: { productId?: string, page: number, postsPerPage?: number }, isInfiniteScroll?: boolean): Promise<void>;
}
const useReviewsStore = create<ReviewsStore>((set) => ({
    reviews: [],
    ratings:  {
        _id: null,
        totalRating: 0,
        averageRating: 0,
        reviewCount: 0,
    },
    page: 1,
    totalReviews: 0,
    review: {} as IReview,
    getReviews: async (o, isInfiniteScroll = false) => {
        const skip = isInfiniteScroll ? (o.page - 1) * (o?.postsPerPage || 20) : 0;
        try {
            const skipPageData = JSON.parse(JSON.stringify({ skip, postsPerPage: o.postsPerPage || 20, productId: o.productId }));
            const res = await getReviewsFromServer(skipPageData);
            if (res) {
                const { reviewsRes, totalReviews, ratings } = res;
                set(() => ({ totalReviews, ratings }));
                if (!isInfiniteScroll)
                    set({ reviews: reviewsRes });
                else
                    set((state) => ({ reviews: [...state.reviews, ...reviewsRes] }));
            }
            else set({ reviews: [] });

        } catch (error) {
            console.error(error);
        }
    },
    increasePage: () => set((state) => ({ page: state.page + 1 })),
}))


export default useReviewsStore