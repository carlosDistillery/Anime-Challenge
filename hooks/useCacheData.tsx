import React from "react";
import { Dispatch } from "react";
import { readCacheData } from "../utils/index";

type ReturnUseCache = {
  isChecked: boolean;
  setIsChecked: Dispatch<React.SetStateAction<boolean>>;
  saveItemToCache: () => void;
};

export function useCacheData({
  id,
  key,
}: {
  id: string;
  key: string;
}): ReturnUseCache {
  const [isChecked, setIsChecked] = React.useState(() =>
    readCacheData({ itemKey: key, valueToFind: id })
  );

  const saveItemToCache = () => {
    if (isChecked) {
      setIsChecked(false);
      const data = JSON.parse(localStorage.getItem(key));
      const dataFiltered = data.filter((cacheValue: any) => {
        return cacheValue.title !== id;
      });

      localStorage.setItem(key, JSON.stringify(dataFiltered));
    } else {
      setIsChecked(true);
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify([{ [key]: id }]));
      } else {
        const data = JSON.parse(localStorage.getItem(key));
        data.push({ title: id });
        localStorage.setItem(key, JSON.stringify(data));
      }
    }
  };
  return { isChecked, setIsChecked, saveItemToCache };
}
