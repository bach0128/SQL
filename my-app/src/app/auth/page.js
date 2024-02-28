import Auth from "./Auth";

export default async function page({ searchParams }) {
  return <Auth searchParams={searchParams} />;
}
