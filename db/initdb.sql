CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    title character varying,
    src character varying,
    rating integer DEFAULT 0,
    currenttime time(0) without time zone,
    currentdate date
);

INSERT INTO videos (title, src, currenttime, currentdate) VALUES ('X-MEN: The Animated Series RECAP: Everything You Need to Know Before X-Men "97!', 'https://www.youtube.com/embed/QiIYSipWf4s', NOW(), CURRENT_DATE)

