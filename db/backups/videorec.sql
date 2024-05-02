--
-- PostgreSQL database dump
--

-- Dumped from database version 14.11 (Homebrew)
-- Dumped by pg_dump version 14.11 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: videos; Type: TABLE; Schema: public; Owner: marcus
--

CREATE TABLE public.videos (
    id integer NOT NULL,
    title character varying,
    src character varying,
    rating integer DEFAULT 0
);


ALTER TABLE public.videos OWNER TO marcus;

--
-- Name: videos_id_seq; Type: SEQUENCE; Schema: public; Owner: marcus
--

CREATE SEQUENCE public.videos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.videos_id_seq OWNER TO marcus;

--
-- Name: videos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: marcus
--

ALTER SEQUENCE public.videos_id_seq OWNED BY public.videos.id;


--
-- Name: videos id; Type: DEFAULT; Schema: public; Owner: marcus
--

ALTER TABLE ONLY public.videos ALTER COLUMN id SET DEFAULT nextval('public.videos_id_seq'::regclass);


--
-- Data for Name: videos; Type: TABLE DATA; Schema: public; Owner: marcus
--

COPY public.videos (id, title, src, rating) FROM stdin;
278	X-MEN: The Animated Series RECAP: Everything You Need to Know Before X-Men '97!	https://www.youtube.com/embed/QiIYSipWf4s	0
284	Let's play: Eiyuden Chronicle - Hundred Heroes: Ep08 - The case of the missing Mellore?! [PC, Blind]	https://www.youtube.com/embed/5M25oCn-9to	0
74	4 No-Face YouTube Channels That Can Make You $300/Day (Real Examples)	https://www.youtube.com/embed/-nreHHeIRAY	0
\.


--
-- Name: videos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: marcus
--

SELECT pg_catalog.setval('public.videos_id_seq', 286, true);


--
-- Name: videos videos_pkey; Type: CONSTRAINT; Schema: public; Owner: marcus
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

