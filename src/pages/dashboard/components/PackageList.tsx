import PackageCard from "./PackageCard";
import type { Package } from "../../../types/package";

const PackageList = ({
  data,
  onSelect,
}: {
  data: Package[];
  onSelect: (pkg: Package) => void;
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {data.map((item) => (
        <PackageCard key={item.id} item={item} onClick={onSelect} />
      ))}
    </div>
  );
};

export default PackageList;