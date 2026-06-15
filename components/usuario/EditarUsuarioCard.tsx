"use client"

import { useState } from "react";
import EditProfileModal from "@/components/feed/EditProfileModal";
import ChangePasswordModal from "@/components/feed/ChangePasswordModal";

export default function EditarUsuarioCard() {
    const [openEdit, setOpenEdit] = useState(false);
    const [openPassword, setOpenPassword] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpenEdit(true)}
                className= "cursor-pointer bg-[#6c3cff] text-white rounded-full h-10 w-[150px] text-[15px] leading-none cursor-pointer"
            >
                Editar Perfil
            </button>

            <EditProfileModal
                isOpen={openEdit}
                onClose={() => setOpenEdit(false)}
                onChangePassword={() => {
                    setOpenEdit(false);
                    setOpenPassword(true);
                }}
            />

            <ChangePasswordModal
                isOpen={openPassword}
                onClose={() => setOpenPassword(false)}
                onBack={() => {
                    setOpenPassword(false);
                    setOpenEdit(true);
                }}
            />
        </>
    );
}