import Navbar from "../shared/Navbar";

// The theme provider should go here to implement dark mode

export default function Layout({ children }) {
    return (
      <>
        <main>
          <Navbar />
          { children }
        </main>
      </>
    )
}