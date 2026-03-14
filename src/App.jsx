import { Routes, Route } from "react-router-dom"
import Tools from "./pages/Tools"
import PasswordGenerator from "./pages/tools/PasswordGen"
import QRGenerator from "./pages/tools/QRGenerator"
import JSONFormatter from "./pages/tools/JSONFormatter"
import UUIDGenerator from "./pages/tools/UUIDGenerator"
import WhatsAppLinkGen from "./pages/tools/WhatsAppLinkGen"
import Base64Tool from "./pages/tools/PasswordGen"
import URLTool from "./pages/tools/URLTool"
import ColorPicker from "./pages/tools/ColorPicker"
import TimestampConv from "./pages/tools/TimestampConv"
import JWTDecoder from "./pages/tools/JWTDecoder"
import HashGenerator from "./pages/tools/HashGenerator"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Tools />} />
      <Route path="/tools" element={<Tools />} />
      <Route path="/pages/" element={<Tools />} />
      <Route path="/tools/PasswordGen" element={<PasswordGenerator />}></Route>
      <Route path="/tools/QRGenerator" element={<QRGenerator />}></Route>
      <Route path="/tools/JSONFormatter" element={<JSONFormatter />}></Route>
      <Route path="/tools/UUIDGenerator" element={<UUIDGenerator />}></Route>
      <Route path="/tools/WhatsAppLinkGen" element={<WhatsAppLinkGen />}></Route>
      <Route path="/tools/Base64Tool" element={<Base64Tool />}></Route>
      <Route path="/tools/URLTool" element={<URLTool />}></Route>
      <Route path="/tools/ColorPicker" element={<ColorPicker />}></Route>
      <Route path="/tools/TimestampConv" element={<TimestampConv />}></Route>
      <Route path="/tools/JWTDecoder" element={<JWTDecoder />}></Route>
      <Route path="/tools/HashGenerator" element={<HashGenerator />}></Route>
    </Routes>
  )
}

export default App