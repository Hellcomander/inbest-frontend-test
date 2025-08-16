'use client'
import ImageCard from "@/app/components/ImageCard";
import { useEffect, useState } from "react";
import { getImages } from "../../../../lib/api";
import Loader from "@/app/components/Loader";
import { jwtDecode } from 'jwt-decode';

interface ImageData {
    filename: string;
    url: string;
    effect: string;
    description?: string;
    createdAt: string;
}

interface JwtPayload {
    sub: string; 
}

export default function ImagesPage() {
    const [images, setImages] = useState<ImageData[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token) {
            const decoded = jwtDecode<JwtPayload>(token as string);
            const userId = decoded.sub;
            getImages(userId)
            .then(setImages)
            .catch(console.error)
            .finally(() => setLoading(false));
        }
    }, []);

    if (loading) return <Loader />;
    if (!images.length) return <p>No hay imágenes aún.</p>;

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img) => (
                <ImageCard key={img.filename} {...img} />
            ))}
        </div>
    );
}