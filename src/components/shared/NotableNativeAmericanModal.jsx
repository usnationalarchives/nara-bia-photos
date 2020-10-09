import React, { setState, useState, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import styled, { css } from 'styled-components';
import tinycolor from 'tinycolor2';
import { useHistory } from 'react-router-dom';

import { ReactComponent as ArrowRightIcon } from '#assets/icons/arrow-right.svg';
import { ReactComponent as ArrowLeftIcon } from '#assets/icons/arrow-left.svg';
import { ReactComponent as CrossIcon } from '#assets/icons/cross.svg';

// constants
import { tribalNations, externalUrls, notableNativeAmericansNaids } from '#modules/constants';

// modules
import iiifImage from '#modules/iiifImage';

// hooks
import useRecords from '#hooks/useRecords';
import usePagination from '#hooks/usePagination';

// shared components
import * as Text from '#components/shared/Text';
import * as Layout from '#components/shared/Layout';
import Results from '#components/shared/Results';

// styles
import * as frontline from '#styles/frontline';

const ResultsStyles = styled(Results)`
  .result_link {
    ${frontline.fl_static(css`
      color: #fff;
      text-decoration: none;
    `)}

    ${frontline.fl_attention(css`
      color: #fff;
      text-decoration: underline;
    `)}
  }
`;

const NotableNativeAmericanModal = ({ open, setOpen }) => {
  const fidelity = 200;
  const history = useHistory();

  const [results] = useRecords({
    facets: {
      naIds: notableNativeAmericansNaids,
    },
  });

  return (
    <Modal
      animationDuration={300}
      closeIcon={<CrossIcon width={30} fill="#fff" />}
      showCloseIcon={true}
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      center
    >
      <Layout.Padding>
        <Layout.Wrapper medium>
          <Text.H3 style={{ color: '#fff' }}>{'Explore Photographs of Famous Native Americans'}</Text.H3>
          {results.length > 0 && <ResultsStyles results={results} data={results} fidelity={fidelity} />}
        </Layout.Wrapper>
      </Layout.Padding>
    </Modal>
  );
};

export default NotableNativeAmericanModal;
