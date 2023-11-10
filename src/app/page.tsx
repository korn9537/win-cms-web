import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home(props: any) {
  const headersList = headers();
  const referer = headersList.get("referer");

  redirect("/auth/login");

  console.log(props, headersList);

  return <div>Referer: {referer}</div>;
}
