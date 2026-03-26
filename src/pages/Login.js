import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate("/dashboard");
        }
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const data = await loginUser(form);

            if (data.token) {

                localStorage.setItem("token", data.token);
                alert("Login correcto");
                navigate("/dashboard");

            } else {
                alert("❌ Credenciales incorrectas");
            }

        } catch (error) {
            console.error(error);
            alert("Error en login");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                name="username"
                placeholder="Usuario"
                onChange={handleChange}
            />

            <input
                type="password"
                name="password"
                placeholder="Contraseña"
                onChange={handleChange}
            />

            <button type="submit">Entrar</button>
        </form>
    );
}

export default Login;