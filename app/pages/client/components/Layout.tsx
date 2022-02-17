import type { ReactChildren, ReactNode, ReactChild } from "react";

// The theme provider should go here to implement dark mode

export default function Layout({ children }) {
    return (
      <>
        <h1>From Layout</h1>
        <main style={{backgroundColor: "red"}}>{ children }</main>
      </>
    )
}