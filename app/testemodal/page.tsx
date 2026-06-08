"use client";

import { useState } from "react";
import EditProfileModal from "@/components/feed/EditProfileModal";
import ChangePasswordModal from "@/components/feed/ChangePasswordModal";
import AvaliacaoLoja from "@/app/modais/AvaliacaoLoja"
import AvaliacaoProduto from "@/app/modais/AvaliacaoProduto"
import EditarAvaliacaoLoja from "@/app/modais/EditarAvaliacaoLoja"
import EditarAvaliacaoProduto from "@/app/modais/EditarAvaliacaoProduto"

export default function TesteModal() {
    const [openEdit, setOpenEdit] = useState(true);
    const [openPassword, setOpenPassword] = useState(false);

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-200">
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
        </main>
    );
}