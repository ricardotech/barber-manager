"use client";

import type { BarbershopRow } from "@/lib/types";
import { BarbershopTable } from "./BarbershopTable";
import { columns } from "./BarbershopColumns";
// import { useEffect, useState } from "react";
// import { getBarbershops } from "@/actions/barbershops"; // Potentially for client-side fetching/refreshing

interface BarbershopClientPageProps {
  initialData: BarbershopRow[];
}

export function BarbershopClientPage({ initialData }: BarbershopClientPageProps) {
  // const [data, setData] = useState<BarbershopRow[]>(initialData);

  // Example for client-side refresh, though initialData is preferred for RSC
  // useEffect(() => {
  //   async function fetchData() {
  //     const barbershops = await getBarbershops();
  //     setData(barbershops);
  //   }
  //   // fetchData(); // Call if you need to refresh data on client
  // }, []);

  return (
    <div>
      <BarbershopTable columns={columns} data={initialData} />
    </div>
  );
}
