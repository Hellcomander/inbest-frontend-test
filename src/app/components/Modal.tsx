"use client";

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg">
                    {title && (
                        <DialogTitle className="text-lg font-bold mb-4 text-black">{title}</DialogTitle>
                    )}

                    {children}

                    <div className="mt-6 flex justify-end">
                        <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-400 rounded-lg hover:bg-gray-300 transition hover:cursor-pointer"
                        >
                        Cerrar
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}
