import { useCacheData } from "../../hooks/useCacheData";

function Episode({ episode }: { episode: string }) {
  const { isChecked, saveItemToCache } = useCacheData({
    id: episode,
    key: "episodes",
  });
  return (
    <div>
      <button
        onClick={() => saveItemToCache()}
        style={{ cursor: "pointer", background: "none", border: "none" }}
      >
        {isChecked ? "✅" : "✔️"}
      </button>
      - {episode}
    </div>
  );
}

export { Episode };
