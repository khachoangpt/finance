import { HomeTemplate } from "@/modules/home";

export default async function Home() {
  const goldPrices = await fetch("https://www.vang.today/api/prices.php").then(
    (res) => res.json(),
  );
  const pricesRange = await fetch(
    `https://www.vang.today/api/prices.php?days=30`,
  ).then((res) => res.json());

  return (
    <HomeTemplate
      goldPrices={goldPrices}
      pricesRange={pricesRange.history.reverse()}
    />
  );
}
