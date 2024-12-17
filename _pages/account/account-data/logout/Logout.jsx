"use client";

import { Modal } from "@/_components/shared/modal";
import { useRouter } from "next/navigation";

import { userContext } from "@/context/userContext";
import { useLogout } from "@/hooks/ecommerce.hooks";

import { useContext } from "react";

export default function Logout() {
  const router = useRouter();
  const { logout } = useContext(userContext);
  const { mutateAsync, isPending } = useLogout();

  return (
    <Modal
      type={`modal`}
      show={true}
      handleOpen={() => {
        router.push(`?tab=dashboard`);
      }}
      description={`Da li ste sigurni da želite da se odjavite?`}
      title={`Odjava`}
    >
      <button
        className="w-full bg-[#04b400] mt-4 hover:bg-[#04b400]/80 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#04b400] sm:text-base shadow disabled:opacity-50"
        onClick={() => {
          logout(mutateAsync);
        }}
      >
        DA
      </button>
    </Modal>
  );
}
