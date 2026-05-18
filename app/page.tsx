'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth/login");
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Service Hive assingment project
      </h1>
    </div>
  );
}
