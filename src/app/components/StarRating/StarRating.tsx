import { StarRatingProps } from "@/app/types/types";

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    console.log(rating);
    
    const fullStars = Math.floor(rating);
    const remainingStars = 5 - fullStars;

    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, index) => (
                <div key={index} className="flex items-center mr-1 text-yellow-400">
                    <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.03L7 14.15L2 9.27L8.91 8.26L12 2z"></path>
                    </svg>
                </div>
            ))}
            {[...Array(remainingStars)].map((_, index) => (
                <div key={index} className="flex items-center mr-1 text-gray-400">
                    <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.03L7 14.15L2 9.27L8.91 8.26L12 2z"></path>
                    </svg>
                </div>
            ))}
        </div>
    );
};

export default StarRating;