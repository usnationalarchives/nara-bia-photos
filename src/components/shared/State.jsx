import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import numeral from 'numeral';
import _ from 'lodash';
import { Link } from 'react-router-dom';

// helpers
import { joinParams } from '#modules/helpers';

// assets
import { ReactComponent as PhotoIcon } from '#assets/icons/photo.svg';

// components
import CoverLink from '#components/shared/CoverLink';

// styles
import { fl_allStates, fl_static, fl_attention } from '#styles/frontline';

const Description = styled.p`
  color: ${props => props.theme.colors.darkGrey};
  flex: 1 1 auto;
  font-size: 0.9375rem;
`;

const Image = styled.div`
  background-color: ${props => props.theme.colors.mediumGrey};
  background-size: cover;
  height: 0;
  padding-top: 56.25%;
`;

const Inner = styled.div`
  padding: 1rem 1.5rem;
  display: flex;
  flex: 2 0 auto;
  flex-direction: row;
  align-items: center;
`;

const Label = styled(CoverLink)`
  font-size: 1rem;
  font-weight: bold;
  display: block;
  text-decoration: none;

  ${fl_allStates(css`
    color: ${props => props.theme.colors.darkGrey};
  `)}
`;

const Meta = styled.div`
  flex: 1 0 120px;
  padding-right: 10px;
`;

const PhotoIconStyled = styled(PhotoIcon)`
  display: inline-block;
  margin-right: 10px;
`;

const RecordCount = styled.span`
  display: inline-block;
  font-weight: bold;
  font-size: 1.375em;
`;

const TribeLink = styled(Link)`
  position: relative;
  z-index: 999;

  ${fl_static(css`
    color: ${props => props.theme.colors.darkGrey};
    text-decoration: underline;
  `)}

  ${fl_attention(css`
    color: ${props => props.theme.colors.blue};
  `)}
`;

const State = ({ state, thumbnailUrl, results }) => {
  function formatRecordCount(num) {
    if (num > 9999) {
      num = numeral(num).format('0a');
    }
    return num;
  }

  function getTribesCount(records) {
    const tribes = records.map(record => {
      return record.tribes;
    });

    let count = _.compact(tribes).length;
    return count;
  }

  function getProminentTribe(records) {
    let tribes = records.map(record => {
      return record.tribes;
    });

    tribes = _.compact(tribes);
    let result = _.head(_(tribes).countBy().entries().maxBy(_.last));
    return result;
  }

  const prominantTribeName = getProminentTribe(results);
  const tribeCount = getTribesCount(results);
  const tribeUrl = `/states/${state.slug}?${joinParams('tribalNations', [prominantTribeName])}`;

  return (
    <Fragment>
      <Image style={{ backgroundImage: `url(${thumbnailUrl})` }} />
      <Inner>
        <Meta>
          <Label to={`/states/${state.slug}`}>{state.name}</Label>
          <span>
            <PhotoIconStyled width="21"></PhotoIconStyled>
            <RecordCount>{formatRecordCount(results.length)}</RecordCount>
          </span>
        </Meta>
        <Description>
          Records related to {tribeCount} Tribal Nations including{' '}
          <TribeLink style={{ position: 'relative', zIndex: 1000 }} to={tribeUrl}>
            {prominantTribeName}
          </TribeLink>
        </Description>
      </Inner>
    </Fragment>
  );
};

export default State;
