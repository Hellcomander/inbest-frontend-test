const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getImages(userId: string) {
    const res = await fetch(`${API_URL}/images/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
    });

    if (!res.ok) throw new Error('Error al obtener imágenes');

    const data = await res.json()
    console.log(data);
    return data;
}

export async function login(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al iniciar sesión");
    }

    return res.json();
}

export async function requestApplyEffect(formData: FormData) {
    const res = await fetch(`${API_URL}/images/upload`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: formData
    });

    if (!res.ok) throw new Error('Error al aplicar efecto a la imagen. Intentelo de nuevo más tarde.');

    return res.json();
}
