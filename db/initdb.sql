CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    title character varying,
    src character varying,
    rating integer DEFAULT 0,
    currenttime time(0) without time zone,
    currentdate date
);

INSERT INTO videos (title, src, currenttime, currentdate) VALUES ('Make money with coding.. What youre NOT being told!', 'https://youtu.be/CX0V_hspEZU?si=PKEXv3tmSZo5FtKU', NOW(), CURRENT_DATE)

