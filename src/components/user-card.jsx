import React from "react";

const UserCard = ({ user }) => {
  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Anonymous";
  const skills = user?.skills ?? [];

  return (
    <article className="group relative w-[340px] overflow-hidden rounded-2xl bg-base-100 shadow-xl shadow-black/5 ring-1 ring-base-content/5 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:ring-primary/20 hover:-translate-y-0.5">
      {/* Image container with gradient overlay */}
      <div className="relative aspect-4/3 overflow-hidden bg-base-300">
        <img
          src={user?.photoUrl}
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
        {user?.about && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-base-content/70">
            {user.about}
          </p>
        )}

        {skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {skills.slice(0, 5).map((skill, i) => (
              <span
                key={i}
                className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary"
              >
                {skill}
              </span>
            ))}
            {skills.length > 5 && (
              <span className="rounded-full bg-base-300 px-2.5 py-0.5 text-xs text-base-content/60">
                +{skills.length - 5}
              </span>
            )}
          </div>
        )}

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
      </div>
    </article>
  );
};

export default UserCard;
