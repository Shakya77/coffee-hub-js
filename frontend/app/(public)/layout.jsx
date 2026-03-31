import React from "react";
import Navbar from "../../components/website/layout/navbar";
import Footer from "../../components/website/layout/footer";

export default function layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
