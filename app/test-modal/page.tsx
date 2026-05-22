"use client";

import { useState } from "react";
import EditProfileModal from "@/components/feed/EditProfileModal";

export default function TesteModal() {
    const [open, setOpen] = useState(true);

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-200">
            <button
                onClick={() => setOpen(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-full m-4"
            >
                Abrir Modal
            </button>

            <EditProfileModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onChangePassword={() => {}}
            />
        </main>
    );
}