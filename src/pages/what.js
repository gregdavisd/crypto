import useGA from "../hooks/useGA";

import BackBar from "../components/BackBar";
import CustomHead from "../components/CustomHead";
import ExternalLink from "../components/ExternalLink";
import Footer from "../components/Footer";
import SimpleHeader from "../components/SimpleHeader";

export default function WhatIsSite() {
  useGA();
  return (
    <>
      <CustomHead
        title="What is?"
        description={""}
        urlPath="attribution"
      />
      <SimpleHeader>What is?</SimpleHeader>
      <BackBar />
      <div className="content-wrapper">
        <article className="generic-page what-page longform-text">
          <p>
            <li>
              <ExternalLink href="https://rekt.news/">Rekt.news</ExternalLink>
            </li>
          </p>
        </article>
      </div>
      <Footer />
    </>
  );
}
