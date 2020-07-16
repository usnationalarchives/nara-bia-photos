import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// components
import * as Layout from "#components/shared/Layout";
import * as Text from "#components/shared/Text";
import Pagination from "#components/shared/Pagination";

// hooks
import useRecords from "#hooks/useRecords";
import usePagination from "#hooks/usePagination";

// modules
import { states } from "#modules/constants";

const StateListing = ({ ...props }) => {
  const slug = props.match.params.slug;
  const stateName = states.filter((state) => state.slug === slug)[0].name;

  const { results } = useRecords({
    facets: {
      states: [stateName],
    },
  });

  const {
    page,
    setPage,
    prevHandler,
    nextHandler,
    prevPage,
    nextPage,
    totalPages,
    data,
  } = usePagination({
    items: results,
    perPage: 30,
  });

  // Scroll to the top of the document when the page changes
  useEffect(() => {
    if (page !== 1) {
      document.querySelector("html").scrollTop = 0;
    }
  }, [page]);

  return (
    <Layout.Padding>
      <Layout.Wrapper>
        <Text.H1>{stateName}</Text.H1>

        {data.map((result) => (
          <Link key={result.slug} to={`/${result.slug}`}>
            <img src={result.thumbnailUrl} alt="" aria-hidden="true" />
            <p>{result.title}</p>
          </Link>
        ))}

        <Pagination
          style={{ marginBottom: "20px" }}
          page={page}
          setPage={setPage}
          prevHandler={prevHandler}
          nextHandler={nextHandler}
          prevPage={prevPage}
          nextPage={nextPage}
          totalPages={totalPages}
        />
      </Layout.Wrapper>
    </Layout.Padding>
  );
};

export default StateListing;
