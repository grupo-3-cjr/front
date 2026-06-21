import RatingCard from "./RatingCard";

type Rating = {
  id: number;
  user_id: number;
  store_id: number;
  rating: number;
  comment: string;
};

type RatingCommentsProps = {
  ratingComments: Rating[];
  userId: number;
  userName: string;
  userAvatar: string;
};

export default function RatingFunction({
  ratingComments,
  userId,
  userName,
  userAvatar,
}: RatingCommentsProps) {
  return (
    <section className="mt-11 ml-16">
      <section className="flex justify-between">
        <div className="flex items-end justify-between mb-6">
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-8">
              Avaliações
            </h2>
          </div>
        </div>
      </section>

      <div className="flex overflow-x-auto pb-4 gap-16">
        {ratingComments.length === 0 ? (
          <p className="text-[#737272] dark:text-gray-400">
            Nenhuma avaliação encontrada.
          </p>
        ) : (
          ratingComments.map((rating) => (
            <RatingCard
              key={rating.id}
              avatar_url={userAvatar}
              name={userName}
              text={rating.comment}
              rating={rating.rating}
            />
          ))
        )}
      </div>
    </section>
  );
}