"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import { requestApplyEffect } from "../../../lib/api";
import { jwtDecode } from 'jwt-decode';
import Modal from "./Modal";
import ImageCard from "./ImageCard";

interface JwtPayload {
    sub: string; 
}

interface ImageData {
    filename: string;
    url: string;
    effect: string;
    description: string;
    createdAt: string;
}

export default function UploadForm() {
    const [file, setFile] = useState<File | null>(null);
    const [lastImage, setLastImage] = useState<ImageData | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [effect, setEffect] = useState("GrayScale");
    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);

        if (selectedFile) {
            const previewUrl = URL.createObjectURL(selectedFile);
            setPreview(previewUrl);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        try {
            setLoading(true);

            const token = localStorage.getItem('token');

            if(!token) throw new Error('Token expirado');
            
            const decoded = jwtDecode<JwtPayload>(token as string);
        
            const formData = new FormData();
            formData.append("image", file);
            formData.append("effect", effect);
            formData.append("userId", decoded.sub);

            const infoImage: ImageData = await requestApplyEffect(formData);

            Swal.fire({
                title: "¡Hecho!",
                text: "Efecto aplicado correctamente 🔥",
                icon: "success",
                confirmButtonText: "OK",
            });

            setLastImage(infoImage);
            setModalIsOpen(true);
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: "¡Algo salió mal!",
                text: "Error al aplicar efecto a la imagen. Intentelo de nuevo más tarde.",
                icon: "error",
                confirmButtonText: "OK",
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100 hover:cursor-pointer"
            />

            {preview && (
                <div className="mt-4">
                <p className="text-sm text-white mb-2 font-bold">Vista previa:</p>
                <img
                    src={preview}
                    alt="Preview"
                    className="max-h-64 rounded shadow"
                />
                </div>
            )}

            <div>
                <label className="block mb-1 font-bold">Efecto:</label>
                <select
                value={effect}
                onChange={(e) => setEffect(e.target.value)}
                className="w-full border rounded p-2"
                >
                <option value="GrayScale">Escala de grises</option>
                <option value="Rotate">Rotar</option>
                <option value="Invert">Invertir colores</option>
                </select>
            </div>

            <button
                type="submit"
                disabled={!file || loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 not-disabled:hover:cursor-pointer disabled:hover:cursor-not-allowed"
            >
                {loading ? "Procesando..." : "Subir imagen"}
            </button>

            {
                lastImage && (
                    <Modal
                        isOpen={modalIsOpen}
                        onClose={() => setModalIsOpen(false)}
                        title="Resultado del efecto aplicado"
                    >
                        <ImageCard key={lastImage.filename} {...lastImage} />
                    </Modal>

                )
            }
        </form>
    )
}