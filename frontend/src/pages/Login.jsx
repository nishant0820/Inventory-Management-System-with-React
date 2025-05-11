import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router";
import axios from "axios";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, seLoading] = useState(false);

    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        seLoading(true);
        setError(null);

        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", {
                email, password
            });

            if (response.data.success) {
                await login(response.data.user, response.data.token);
                if(response.data.user.role === "admin") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/customer/dashboard");
                }
            } else {
                alert(response.data.error);
            }
        } catch (error) {
            if(error.response) {
                setError(error.response.data.message);
            }
        } finally {
            seLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-green-600 from-50% to-gray-100 to-50% space-y-6">
            <h2 className="text-3xl text-white">Inventory Management System</h2>
            <div className="border shadow-lg p-6 w-80 bg-white">
                <h2 className="text=2xl font-bold mb-4">Login</h2>
                {error && (<div className="bg-red-200 text-red-700 p-2 mb-4 rounded">{error}</div>)}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border" name="email" placeholder="Enter Email" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border" name="password" placeholder="Enter Password" required />
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="w-full bg-green-600 text-white py-2 cursor-pointer">{loading ? "Loading" : "Login"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;