import { Routes, Route } from "react-router-dom";
import "@elastic/eui/dist/eui_theme_light.css";
import { EuiProvider } from "@elastic/eui";

import Home from "./pages/Home";
import CreateItem from "./pages/Item/CreateItem/CreateItem";
import EditItem from "./pages/Item/EditItem/EditItem";
import Toasts from "./components/Toast/toast";

const App = () => (
  <EuiProvider colorMode="light">
    <Toasts />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="item/create" element={<CreateItem />} />
      <Route path="items/edit/:id" element={<EditItem />} />
    </Routes>
  </EuiProvider>
);

export default App;
