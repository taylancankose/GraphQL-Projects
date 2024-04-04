import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ChakraProvider } from "@chakra-ui/react";
import CommentDetail from "./pages/CommentDetail";

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comment/:id" element={<CommentDetail />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
