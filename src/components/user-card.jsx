import React from "react";

const UserCard = ({
  firstName,
  lastName,
  age,
  gender,
  about,
  photoUrl,
  isActionButton,
}) => {
  const fullName =
    [firstName, lastName].filter(Boolean).join(" ") || "Anonymous";

  return (
    <article className="group relative w-[340px] overflow-hidden rounded-2xl bg-base-100 shadow-xl shadow-black/5 ring-1 ring-base-content/5 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:ring-primary/20 hover:-translate-y-0.5">
      {/* Image container with gradient overlay */}
      <div className="relative aspect-4/3 overflow-hidden bg-base-300">
        <img
          src={photoUrl}
          alt={fullName}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-base-100 via-base-100/20 to-transparent opacity-90"
          aria-hidden
        />
        {/* Subtle accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-secondary to-accent opacity-80" />
      </div>

      <div className="relative px-5 pb-5 pt-4">
        <h2 className="text-xl font-bold tracking-tight text-base-content">
          {fullName}
        </h2>
        <p className="text-sm text-base-content/70">Age: {age}</p>
        <p className="text-sm text-base-content/70">Gender: {gender}</p>
        {about && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-base-content/70">
            {about}
          </p>
        )}

        {isActionButton && (
          <div className="mt-5 flex gap-2">
            <button
              type="button"
              className="btn btn-outline btn-error btn-sm flex-1 rounded-xl font-medium"
            >
              Ignore
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm flex-1 rounded-xl font-medium shadow-lg shadow-primary/25"
            >
              Send Request
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default UserCard;
