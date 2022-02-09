import { NextPageContext } from "next";

function Pokemon({ id, data }: { id: string; data: [] }) {
  return (
    <div>
      Next stars: {id} - {JSON.stringify(data)}
    </div>
  );
}

Pokemon.getInitialProps = async (ctx: NextPageContext) => {
  console.log("Ejecutandp", ctx.query.id);
  const res = await fetch(`https://kitsu.io/api/edge/anime/${ctx.query.id}`);
  const json = await res.json();
  return { id: ctx.query.id, data: json };
};
export default Pokemon;
