import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './shared/base.css'
import {CookiesProvider} from "react-cookie";

const root:ReactDOM.Root = ReactDOM.createRoot(document.getElementById("root")as HTMLElement ) ;
const queryClient: QueryClient = new QueryClient();
root.render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <CookiesProvider>
                <App/>
            </CookiesProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right"/>
    </QueryClientProvider>
);

//appEntry
