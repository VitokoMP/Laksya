import { Navigate, Route, Routes } from "react-router-dom";
import { NavBar } from "./routes/Components/NavBar"; 
import { HomeScreen } from "./routes/HomeScreen";
import { ContactScreen } from "./routes/ContactScreen";
import { UsuarioProvider } from "./context/UsuarioProvider";

export const AlekhartApp = () => {
  return (
    <UsuarioProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/contact" element={<ContactScreen />} /> 
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </UsuarioProvider>
  );
};
