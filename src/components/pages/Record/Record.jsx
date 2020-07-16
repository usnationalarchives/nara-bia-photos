import React, { Fragment } from "react";

// components
import * as Text from "#components/shared/Text";
import * as Layout from "#components/shared/Layout";
import ImageViewer from "./ImageViewer";

// hooks
import useRecords from "#hooks/useRecords";

const Record = ({ ...props }) => {
  const slug = props.match.params.slug;
  const slugParts = slug.split("-");
  const naId = parseInt(slugParts[slugParts.length - 1]);

  const { results } = useRecords({
    facets: {
      naIds: [naId],
    },
  });

  const record = results[0];

  return (
    <Layout.Padding style={{ marginTop: "1rem", marginBottom: "2rem" }}>
      <Layout.Wrapper>
        {record && (
          <Fragment>
            <Text.H1>{record.title}</Text.H1>
            <ImageViewer record={record} />
          </Fragment>
        )}
      </Layout.Wrapper>
    </Layout.Padding>
  );
};

export default Record;
