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
                style={{
                    backgroundColor: "#6c3cff",
                    color: "white",
                    border: "none",
                    borderRadius: "50px",
                    padding: "10px 40px",
                    fontSize: "clamp(13px, 1.5vw, 15px)",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    width: "clamp(160px, 20vw, 220px)",
                }}
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