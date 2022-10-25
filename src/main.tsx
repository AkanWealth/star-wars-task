import App from "./App";
import React from "react";
import 'antd/dist/antd.css';
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from 'react-query';

import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
  </React.StrictMode>
);
