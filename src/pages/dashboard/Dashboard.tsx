import { useEffect, useState, useMemo } from "react";
import MainLayout from "../../components/layout/MainLayout";
import { packageService } from "../../services/packageService";
import type { Package } from "../../types/package";

import Hero from "./components/Hero";
import PackageFilter from "./components/PackageFilter";
import PackageList from "./components/PackageList";
import PackageModal from "./components/PackageModal";
import Pagination from "./components/Pagination";
import LoadingState from "./components/LoadingState";
import EmptyState from "./components/EmptyState";
import ErrorState from "./components/ErrorState";

const Dashboard = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [provider, setProvider] = useState("");
  const [price, setPrice] = useState("");
  const [quota, setQuota] = useState("");

  const [page, setPage] = useState(1);
  const perPage = 8;

  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  useEffect(() => {
  setPage(1);
  }, [provider, price, quota]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await packageService.getPackages();
        setPackages(data);
      } catch {
        setError("Gagal mengambil data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtered = useMemo(() => {
  return packages.filter((p) => {
    const matchProvider = provider ? p.provider === provider : true;

    const matchPrice =
      price !== "" ? p.price <= Number(price) : true;

    const matchQuota =
      quota !== "" ? p.quota >= Number(quota) : true;

    return matchProvider && matchPrice && matchQuota;
  });
}, [packages, provider, price, quota]);

  // 🔥 PAGINATION
  const totalPage = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <MainLayout>
      <Hero />

      <PackageFilter
        provider={provider}
        setProvider={setProvider}
        price={price}
        setPrice={setPrice}
        quota={quota}
        setQuota={setQuota}
      />

      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}
      {!loading && filtered.length === 0 && <EmptyState />}

      {!loading && !error && (
        <>
          <PackageList
              data={paginated}
              onSelect={(pkg) => setSelectedPackage(pkg)}
            />
                      <Pagination page={page} total={totalPage} setPage={setPage} />
                      {selectedPackage && (
              <PackageModal
                pkg={selectedPackage}
                onClose={() => setSelectedPackage(null)}
              />
            )}
        </>
      )}
    </MainLayout>
  );
};

export default Dashboard;