import PropTypes from "prop-types";
import React, { useMemo } from "react";
import useGA from "../hooks/useGA";

import { add, isPast, startOfMonth, sub } from "date-fns";
import filter from "lodash.filter";
import find from "lodash.find";
import { formatDollarString } from "../js/utilities";

import { getMoney } from "../db/money";

import BackBar from "../components/BackBar";
import CustomHead from "../components/CustomHead";
import DonationsBar from "../components/DonationsBar";
//import ExternalLink from "../components/ExternalLink";
import Footer from "../components/Footer";
import SimpleHeader from "../components/SimpleHeader";

export async function getServerSideProps() {
  return {
    props: {
      money: await getMoney(),
    },
  };
}

const humanizeMonthAndYear = (date) =>
  date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    timeZone: "utc",
  });

export default function Contribute({ money }) {
  useGA();

  const totalExpenses = useMemo(
    () =>
      money.expenses.reduce((acc, { value }) => acc + value, 0) +
      money.nextMonthEstimate,
    [money]
  );

  const nextMonth = useMemo(() => {
    let lastMonthOfExpenses = startOfMonth(new Date());
    for (let i = 0; i < 5; i++) {
      // Could use a while loop, but if something gets screwy in the DB it'll kick off an infinite loop.
      // If I haven't updated in multiple months, something's wrong here, no need to loop forever.
      const latestExpense = find(money.expenses, {
        date: humanizeMonthAndYear(lastMonthOfExpenses),
        label: "Cloud services",
      });
      if (latestExpense) {
        break;
      } else {
        lastMonthOfExpenses = sub(lastMonthOfExpenses, { months: 1 });
      }
    }

    const nextMonth = add(lastMonthOfExpenses, { months: 1 });
    return humanizeMonthAndYear(nextMonth);
  }, [money]);

  const tableRows = useMemo(() => {
    let rows = [];
    let month = new Date("2021-12-01T12:00:00");
    while (isPast(month)) {
      const monthStr = humanizeMonthAndYear(month);
      const expenses = filter(money.expenses, { date: monthStr });
      let credits = filter(money.credits, { date: monthStr });
      if (credits.length) {
        credits = credits.map((c) => ({
          ...c,
          label: `${c.label}*`,
          value: -c.value,
        }));
        rows = rows.concat(credits);
      }
      if (expenses.length) {
        rows = rows.concat(expenses);
      }
      month = add(month, { months: 1 });
    }
    return rows;
  }, [money]);

  return (
    <>
      <CustomHead
        title="Contribute"
        description="Contribute"
        urlPath="contribute"
      />
      <SimpleHeader>Contribute</SimpleHeader>
      <BackBar />
      <div className="content-wrapper">
        <article className="generic-page longform-text">
          <h2>Suggest an addition or change</h2>
          <p>
          </p>
          <p>
          </p>
          <h2>Donate</h2>
          <p>
          </p>
          <h3>Expenses</h3>
          <table className="expenses centered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Date</th>
                <th>Amount (USD)</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row) => (
                <tr key={`${row.label}-${row.date}`}>
                  <td>{row.label}</td>
                  <td>{row.date}</td>
                  <td className="number">{formatDollarString(row.value)}</td>
                </tr>
              ))}
              <tr className="estimate">
                <td>
                  <i>Cloud services estimate</i>
                </td>
                <td>{nextMonth}</td>
                <td className="number">
                  {formatDollarString(money.nextMonthEstimate)}
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  Total expenses to date (including next month's estimate)
                </td>
                <td className="number">{formatDollarString(totalExpenses)}</td>
              </tr>
              <tr>
                <td colSpan={2}>Total donations to date</td>
                <td className="number">
                  {formatDollarString(money.donations)}
                </td>
              </tr>
              <tr>
                <td colSpan={2}>Remaining donations</td>
                <td className="number">
                  {formatDollarString(
                    Math.max(
                      money.donations - (totalExpenses - money.usedCredits),
                      0
                    )
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  Remaining expenses (after donations and credits)
                </td>
                <td className="number">
                  {formatDollarString(
                    Math.max(
                      totalExpenses - money.usedCredits - money.donations,
                      0
                    )
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <DonationsBar
            donations={money.donations}
            totalExpenses={totalExpenses}
            remainingCredits={money.remainingCredits}
            usedCredits={money.usedCredits}
          />
        </article>
      </div>
      <Footer />
    </>
  );
}

Contribute.propTypes = {
  money: PropTypes.shape({
    donations: PropTypes.number.isRequired,
    expenses: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        date: PropTypes.string,
        value: PropTypes.number.isRequired,
      })
    ).isRequired,
    credits: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        date: PropTypes.string,
        value: PropTypes.number.isRequired,
      })
    ).isRequired,
    nextMonthEstimate: PropTypes.number.isRequired,
    remainingCredits: PropTypes.number.isRequired,
    usedCredits: PropTypes.number.isRequired,
  }),
};
