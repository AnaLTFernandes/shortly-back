--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

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
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token character varying(70) NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "shortUrl" character varying(10) NOT NULL,
    url text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: visits; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.visits (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "urlId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: visits_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.visits_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: visits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.visits_id_seq OWNED BY public.visits.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: visits id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visits ALTER COLUMN id SET DEFAULT nextval('public.visits_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (12, 17, '__oxHHpc2GeJWzjz9XBPs487ZiwGKQ0KNHcBPVESbAAHqrUmiA', true, '2022-10-13 14:36:36.119077');
INSERT INTO public.sessions VALUES (13, 16, 'Ba69uFZqHbnwlJ1Zy-9y8Un0pg0DP7TQodPGNxn7tUElUTjkTv', true, '2022-10-13 14:37:06.907093');
INSERT INTO public.sessions VALUES (14, 15, 'TucBbQ0X3GHrubHH6PqCzFeu90dUGwQJS5DD74c3ewjdQ5uJhL', false, '2022-10-13 14:37:17.400174');
INSERT INTO public.sessions VALUES (15, 15, 'jgm4iqPH03vMlgVGoa0aVCwgZDpukqXOcafaNbD6hEJ5qUbAc8', true, '2022-10-13 14:37:52.35334');
INSERT INTO public.sessions VALUES (16, 14, 'rfT-eBYPLV6re03mNKqlPIOWcNqHBqKJ59v45c-JDKoCrcycCS', true, '2022-10-13 14:37:58.28745');
INSERT INTO public.sessions VALUES (17, 18, 'qizVOLdxAsoVrrf_cfmJCvaAHNhOpH_TYCUcSWdQ1T-4UEBN0C', true, '2022-10-14 14:37:20.625483');
INSERT INTO public.sessions VALUES (18, 20, 'KWlz4-3LWgxJjhzSkw33lYxBCDleBB2OYech2PpyePkLBWt1cX', true, '2022-10-14 14:40:49.405273');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (25, 17, 'Zvr9GpiH', 'https://www.youtube.com', '2022-10-13 14:41:40.76348');
INSERT INTO public.urls VALUES (26, 17, 'iR2l9JbN', 'https://www.google.com', '2022-10-13 14:42:24.718125');
INSERT INTO public.urls VALUES (27, 17, 'xrHe1_z-', 'https://www.trello.com', '2022-10-13 14:43:10.591917');
INSERT INTO public.urls VALUES (28, 15, 'kotXnpm2', 'https://www.linkedin.com/in/analtfernandes/', '2022-10-13 14:44:28.543051');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (14, 'Sammuel', 'apenaseu@gmail.com', '$2b$13$FYgNORPJHDhNQNHlT224v.DLbSqGBrXcCsi5VPzTrhyGnKKvnGBk2', '2022-10-13 14:34:57.449795');
INSERT INTO public.users VALUES (15, 'Kira', 'deusdonovomundo@me.com', '$2b$13$UMF/VBSfGhCvW4OzaToSFu7GV.bJGXN6KYij0DsZL2oLoVSxEGZ9.', '2022-10-13 14:35:16.541463');
INSERT INTO public.users VALUES (16, 'Anabel', 'eumesma@me.com', '$2b$13$/LbKHyKAhHtNAmAjQMx7fuMQiJ5dCQiuHkiWthug9QZyOZZEAVI02', '2022-10-13 14:35:39.985249');
INSERT INTO public.users VALUES (17, 'Timothy', 'sigaocoelhobranco@mail.com', '$2b$13$wo/qANrp5qciPmz1qsFcgOQ65dP20PxKSgh4D5XVdvQwM/Hg2gxFG', '2022-10-13 14:36:09.132348');
INSERT INTO public.users VALUES (18, 'Dante', 'eu@gmail.com', '$2b$13$pSBXB4LSRyxdbDQ6NA9YbuM7G18425dkYIefXiua49JsJC0m9ucyq', '2022-10-14 14:03:23.011804');
INSERT INTO public.users VALUES (19, 'Dante', 'outroeu@gmail.com', '$2b$13$ngaJo4e.qPzH4tNujm3roOilFmzxFBltPcrkPXqGJx2fJftm/gusK', '2022-10-14 14:08:55.166768');
INSERT INTO public.users VALUES (20, 'Noah', 'noah@me.com', '$2b$13$vv3G5pUU0OaBzupGlXN43uL9GcFriOGP/wV.SZVv5.u48wtaWW51y', '2022-10-14 14:40:27.219245');


--
-- Data for Name: visits; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.visits VALUES (11, 17, 25, '2022-10-13 14:42:00.996137');
INSERT INTO public.visits VALUES (12, 17, 25, '2022-10-13 14:42:04.645354');
INSERT INTO public.visits VALUES (13, 17, 25, '2022-10-13 14:42:06.111345');
INSERT INTO public.visits VALUES (14, 17, 25, '2022-10-13 14:42:07.377951');
INSERT INTO public.visits VALUES (15, 17, 25, '2022-10-13 14:42:09.152138');
INSERT INTO public.visits VALUES (16, 17, 26, '2022-10-13 14:42:30.343936');
INSERT INTO public.visits VALUES (17, 17, 26, '2022-10-13 14:42:31.373344');
INSERT INTO public.visits VALUES (18, 17, 26, '2022-10-13 14:42:31.916028');
INSERT INTO public.visits VALUES (19, 17, 26, '2022-10-13 14:42:32.302257');
INSERT INTO public.visits VALUES (20, 17, 26, '2022-10-13 14:42:32.705618');
INSERT INTO public.visits VALUES (21, 17, 26, '2022-10-13 14:42:33.110178');
INSERT INTO public.visits VALUES (22, 17, 26, '2022-10-13 14:42:33.549353');
INSERT INTO public.visits VALUES (23, 17, 26, '2022-10-13 14:42:34.021281');
INSERT INTO public.visits VALUES (24, 17, 26, '2022-10-13 14:42:35.34026');
INSERT INTO public.visits VALUES (25, 15, 28, '2022-10-13 14:44:35.365521');
INSERT INTO public.visits VALUES (26, 15, 28, '2022-10-13 14:44:36.485898');
INSERT INTO public.visits VALUES (27, 15, 28, '2022-10-13 14:44:38.367006');
INSERT INTO public.visits VALUES (28, 15, 28, '2022-10-13 14:44:41.32472');
INSERT INTO public.visits VALUES (29, 15, 28, '2022-10-13 14:44:41.954422');
INSERT INTO public.visits VALUES (30, 15, 28, '2022-10-13 14:44:42.552921');
INSERT INTO public.visits VALUES (31, 15, 28, '2022-10-13 14:44:43.593461');
INSERT INTO public.visits VALUES (32, 15, 28, '2022-10-13 14:44:44.500509');
INSERT INTO public.visits VALUES (33, 15, 28, '2022-10-13 14:44:45.479837');
INSERT INTO public.visits VALUES (34, 15, 28, '2022-10-13 14:44:46.03584');
INSERT INTO public.visits VALUES (35, 15, 28, '2022-10-13 14:44:46.896751');
INSERT INTO public.visits VALUES (36, 15, 28, '2022-10-13 14:44:47.570683');
INSERT INTO public.visits VALUES (37, 15, 28, '2022-10-13 14:44:48.086309');
INSERT INTO public.visits VALUES (38, 15, 28, '2022-10-13 14:44:48.621835');
INSERT INTO public.visits VALUES (39, 15, 28, '2022-10-13 14:44:49.120346');
INSERT INTO public.visits VALUES (40, 15, 28, '2022-10-13 14:44:49.647487');
INSERT INTO public.visits VALUES (41, 15, 28, '2022-10-13 14:44:50.297154');
INSERT INTO public.visits VALUES (42, 15, 28, '2022-10-13 14:44:52.11549');
INSERT INTO public.visits VALUES (43, 15, 28, '2022-10-13 14:44:53.131822');
INSERT INTO public.visits VALUES (44, 15, 28, '2022-10-13 14:44:53.892877');
INSERT INTO public.visits VALUES (45, 15, 28, '2022-10-13 14:44:55.049188');
INSERT INTO public.visits VALUES (46, 15, 28, '2022-10-13 14:44:55.927636');
INSERT INTO public.visits VALUES (47, 15, 28, '2022-10-13 14:44:57.243223');
INSERT INTO public.visits VALUES (48, 15, 28, '2022-10-13 14:44:58.288858');
INSERT INTO public.visits VALUES (49, 15, 28, '2022-10-13 14:45:00.498223');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 18, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 28, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 20, true);


--
-- Name: visits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.visits_id_seq', 49, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: visits visits_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT visits_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: visits visits_urlId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT "visits_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES public.urls(id);


--
-- Name: visits visits_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT "visits_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

