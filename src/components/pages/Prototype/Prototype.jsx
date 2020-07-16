import React from "react";
import * as Text from "#components/shared/Text";
import * as Layout from "#components/shared/Layout";

const Prototype = () => {
  return (
    <Layout.Padding style={{ marginTop: "1rem", marginBottom: "2rem" }}>
      <Layout.Wrapper>
        <Text.Rich>
          <Text.H1>Heading 1</Text.H1>
          <Text.H2>Heading 2</Text.H2>
          <Text.H3>Heading 3</Text.H3>
          <Text.H4>Heading 4</Text.H4>
          <Text.H5>Heading 5</Text.H5>
          <Text.H6>Heading 6</Text.H6>

          <Text.Intro>
            Intro Enim eiusmod cupidatat irure elit veniam voluptate voluptate
            commodo voluptate duis. Quis enim aliquip consectetur adipisicing
            sit cillum officia ullamco. Reprehenderit ea minim ullamco sint
            deserunt proident ipsum nisi eu ullamco elit aliqua aute dolore.
          </Text.Intro>

          <p>
            Aute sint consequat sint aliqua. Tempor elit occaecat reprehenderit
            ad in tempor et incididunt exercitation esse. Eiusmod et incididunt
            labore ex do in anim sit excepteur mollit mollit Lorem. Eiusmod ut
            do in ex officia in.
          </p>
          <p>
            Aute sint consequat sint aliqua. Tempor elit occaecat reprehenderit
            ad in tempor et incididunt exercitation esse. Eiusmod et incididunt
            labore ex do in anim sit excepteur mollit mollit Lorem. Eiusmod ut
            do in ex officia in.
          </p>
          <p>
            Aute sint consequat sint aliqua. Tempor elit occaecat reprehenderit
            ad in tempor et incididunt exercitation esse. Eiusmod et incididunt
            labore ex do in anim sit excepteur mollit mollit Lorem. Eiusmod ut
            do in ex officia in.
          </p>
        </Text.Rich>
      </Layout.Wrapper>
    </Layout.Padding>
  );
};

export default Prototype;
