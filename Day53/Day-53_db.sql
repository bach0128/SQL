--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

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
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    user_id integer NOT NULL,
    user_email character varying(100),
    user_number character varying(12),
    user_address text,
    user_point integer,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- Name: order_detail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_detail (
    order_id integer NOT NULL,
    user_id integer NOT NULL,
    user_email character varying(100),
    user_number character varying(12),
    order_products text,
    status text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.order_detail OWNER TO postgres;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    order_id integer NOT NULL,
    user_id integer NOT NULL,
    user_email character varying(100),
    user_number character varying(12),
    quatinty integer,
    total integer,
    status text,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    product_id integer NOT NULL,
    product_name text,
    product_price integer,
    product_img text,
    product_desciption text,
    product_quatinty integer,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (user_id, user_email, user_number, user_address, user_point, created_at, updated_at) FROM stdin;
1	nguyenvana@gmail.com	941245244	ha-noi	148	2024-01-07 21:42:45.036288	2024-01-07 21:42:45.036288
2	tranthib@gmail.com	941245276	ha-noi	140	2024-01-07 21:42:45.036288	2024-01-07 21:42:45.036288
3	levanc@gmail.com	941245271	ha-noi	170	2024-01-07 21:42:45.036288	2024-01-07 21:42:45.036288
4	phamthid@gmail.com	941245211	ha-noi	100	2024-01-07 21:42:45.036288	2024-01-07 21:42:45.036288
5	hoangvane@gmail.com	941245222	ha-noi	100	2024-01-07 21:42:45.036288	2024-01-07 21:42:45.036288
\.


--
-- Data for Name: order_detail; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_detail (order_id, user_id, user_email, user_number, order_products, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (order_id, user_id, user_email, user_number, quatinty, total, status, created_at) FROM stdin;
1	1	nguyenvana@gmail.com	941245278	10	1000000	pending	2024-01-07 21:42:50.394576
2	2	tranthib@gmail.com	941245276	20	1400000	pending	2024-01-07 21:42:50.394576
3	3	levanc@gmail.com	941245271	35	1700000	pending	2024-01-07 21:42:50.394576
4	4	phamthid@gmail.com	941245211	14	1000000	pending	2024-01-07 21:42:50.394576
5	5	hoangvane@gmail.com	941245222	14	1000000	pending	2024-01-07 21:42:50.394576
6	1	nguyenvana@gmail.com	941245244	12	1000000	pending	2024-01-07 21:42:50.394576
7	2	tranthib@gmail.com	941245266	5	500000	pending	2024-01-07 21:42:50.394576
8	3	levanc@gmail.com	941245288	8	600000	pending	2024-01-07 21:42:50.394576
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (product_id, product_name, product_price, product_img, product_desciption, product_quatinty, created_at, updated_at) FROM stdin;
\.


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (user_id);


--
-- Name: customers customers_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_user_id_key UNIQUE (user_id);


--
-- Name: order_detail order_detail_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_detail
    ADD CONSTRAINT order_detail_pkey PRIMARY KEY (order_id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);


--
-- Name: order_detail order_detail_order_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_detail
    ADD CONSTRAINT order_detail_order_id_foreign FOREIGN KEY (order_id) REFERENCES public.orders(order_id) NOT VALID;


--
-- Name: orders orders_user_id_foreigin; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_foreigin FOREIGN KEY (user_id) REFERENCES public.customers(user_id) NOT VALID;


--
-- PostgreSQL database dump complete
--

