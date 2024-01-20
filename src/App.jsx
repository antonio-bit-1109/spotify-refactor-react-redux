import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainComponent from "./Components/MainComponent";
import ListPreferiteSong from "./Components/ListPreferiteSong";
import SideBarvertical from "./Components/SideBarvertical";
import FormSignIn from "./Components/FormSignIn";
import Navbar from "./Components/navBar";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainComponent />} />
                    <Route
                        path="/ListaPreferiti"
                        element={
                            <>
                                <SideBarvertical /> <ListPreferiteSong />
                            </>
                        }
                    />
                    <Route
                        path="/iscriviti"
                        element={
                            <>
                                <Navbar /> <FormSignIn />
                            </>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
