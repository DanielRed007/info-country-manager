import type { ReactChildren, ReactNode, ReactChild } from "react";

export default function Layout(children: any) {
    return (
      <>
        <main style={{backgroundColor: "red"}}>{children}</main>
      </>
    )
}