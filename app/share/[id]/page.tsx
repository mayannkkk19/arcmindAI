"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function SharePage() {

  const { id } = useParams();

  const [data, setData] = useState<any>(null);

  useEffect(() => {

    const fetchGeneration = async () => {

      const response = await fetch(`/api/share/${id}`);

      const result = await response.json();

      setData(result);

    };

    fetchGeneration();

  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold mb-6">
        Shared Generation
      </h1>

      <pre className="bg-black text-white p-6 rounded-xl overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>

    </div>
  );

}