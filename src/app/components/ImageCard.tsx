'use client'

import Image from "next/image";
import Modal from "./Modal";
import { useState } from "react";

interface ImageCardProps {
    filename: string;
    url: string;
    effect: string;
    description?: string;
    createdAt: string;
}

export default function ImageCard({ filename, url, effect, description, createdAt }: ImageCardProps) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    return (
        <>
            <div 
                className="p-10 border-2 border-amber-50 rounded-2xl shadow-amber-100 flex flex-col items-center hover:shadow-lg transition hover:cursor-pointer"
                onClick={() => {
                    setModalIsOpen(true)
                }}
            >
                <Image
                    src={url}
                    alt={filename}
                    width={300}
                    height={200}
                    className="rounded-xl object-cover"
                />
                <div className="mt-3 text-center">
                    <h1 className="text-gray-300 font-bold">Efecto: <span className="font-medium">{effect}</span></h1>
                    {description && <p className="text-sm text-gray-500">{description}</p>}
                    <p className="text-xs text-gray-400 mt-1">{new Date(createdAt).toLocaleDateString()}</p>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                title="Visualizar imagen"
            >
                <Image
                    src={url}
                    alt={filename}
                    width={1200} 
                    height={800}
                    className="rounded-xl object-cover"
                />            
            </Modal>
        </>
    );
}