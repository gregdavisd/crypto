import PropTypes from "prop-types";
import useGA from "../hooks/useGA";

import { getAttribution } from "../db/attribution";

import CustomHead from "../components/CustomHead";
import BackBar from "../components/BackBar";
import ExternalLink from "../components/ExternalLink";
import Footer from "../components/Footer";
import SimpleHeader from "../components/SimpleHeader";

export async function getServerSideProps() {
  return {
    props: {
      attribution: await getAttribution(),
    },
  };
}

export default function Attribution({ attribution }) {
  useGA();

  return (
    <>
      <CustomHead
        title="Attribution – "
        description="Attribution for text, images, and icons used on this site."
        urlPath="attribution"
      />
      <SimpleHeader className="attribution-header">Attribution</SimpleHeader>
      <BackBar />
      <div className="content-wrapper">
        <article className="generic-page longform-text">
          <p>
            Text is licensed under the{" "}
            <ExternalLink
              rel="license"
              href="http://creativecommons.org/licenses/by/3.0/deed.en_US"
            >
              Creative Commons Attribution 3.0 Unported License
            </ExternalLink>
            . Feel free to reuse posts on this site under those terms.
          </p>
          <p>
          </p>
          <p>
            Source code is{" "}
            <ExternalLink href="https://github.com/molly/web3-is-going-great/blob/main/LICENSE">
              MIT-licensed
            </ExternalLink>{" "}
            and available{" "}
            <ExternalLink href="https://github.com/molly/web3-is-going-great">
              on Github
            </ExternalLink>
            .
          </p>
          <p>Most text was written by.</p>
          <h3>Additional text and entries contributed by</h3>
          <ul>
            {attribution.entries.entries.map((entry, ind) => {
              if (entry.href) {
                return (
                  <li key={`${entry.text}-${ind}`}>
                    <ExternalLink href={entry.href}>
                      <span dangerouslySetInnerHTML={{ __html: entry.text }} />
                    </ExternalLink>
                  </li>
                );
              }
              return (
                <li key={`${entry.text}-${ind}`}>
                  <span>{entry.text}</span>
                </li>
              );
            })}
          </ul>
          <h3>Images</h3>
          <ul>
            {attribution.images.entries.map(({ text, href }) => (
              <li key={text}>
                <ExternalLink href={href}>
                  <span dangerouslySetInnerHTML={{ __html: text }} />
                </ExternalLink>
              </li>
            ))}
          </ul>
        </article>
      </div>
      <Footer />
    </>
  );
}

Attribution.propTypes = {
  attribution: PropTypes.shape({
    images: PropTypes.shape({
      entries: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          href: PropTypes.string.isRequired,
        })
      ).isRequired,
    }),
    entries: PropTypes.shape({
      entries: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          href: PropTypes.string,
          sortKey: PropTypes.string,
        })
      ).isRequired,
    }),
  }).isRequired,
};
