import { useSearchParams } from "react-router";

export const useHomePagination = () => {
  // queryParameters => más datos que se pondrán en la url
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategorySearchParam = searchParams.get("category") || 'all';

  const currentLimitSearchParam = searchParams.get("limit") || 6;

  const currentPageSearchParam = searchParams.get("page") || 1;

  const currentTabSearchParam = searchParams.get("tab") || "all";
  const activeTab = ["all", "favorites", "villains", "heroes"]?.includes(
    currentTabSearchParam,
  )
    ? currentTabSearchParam
    : "all";

  return {
    searchParams,
    currentLimitSearchParam,
    currentPageSearchParam,
    currentCategorySearchParam,
    activeTab,

    setSearchParams,
  };
};
