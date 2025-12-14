import React from "react";
import useGA from "../hooks/useGA";
// import Link from "next/link";

import CustomHead from "../components/CustomHead";
import SimpleHeader from "../components/SimpleHeader";
import BackBar from "../components/BackBar";
//import ExternalLink from "../components/ExternalLink";
import Footer from "../components/Footer";

export default function WhatIsSite() {
  useGA();
  return (
    <>
      <CustomHead
        title=""
        description=""
        urlPath="about"
      />
      <SimpleHeader>About</SimpleHeader>
      <BackBar />
      <div className="content-wrapper">
        <article className="generic-page longform-text">
        </article>
      </div>
      <Footer />
    </>
  );
}
