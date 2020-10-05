import React, { setState } from 'react';
import { Modal } from 'react-responsive-modal';
import styled from 'styled-components';

// constants
import { tribalNations, externalUrls } from '#modules/constants';

// modules
import iiifImage from '#modules/iiifImage';
import { getRecordTopics, getRecordStates } from '#modules/helpers';

// shared components
import * as Text from '#components/shared/Text';
import * as Layout from '#components/shared/Layout';
import Meta from '#components/shared/Meta';

const MetaStyled = styled(Meta)`
  display: inline-block;
`;

const MetaWrapper = styled.div`
  color: #fff;
  align-items: flex-start;
  align-items: stretch;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 2rem;

  > * {
    align-items: center;
    display: flex;
    margin-right: 25px;
    margin-bottom: 20px;

    &:not(:first-child) {
      padding-left: 25px;
      border-left: solid 1px ${props => props.theme.colors.mediumGrey};
    }
  }
`;

const RecordModal = ({ activeIndex, items, open, setOpen, setImageIndex }) => {
  if (!!activeIndex) {
    var record = items[activeIndex];

    var tribalNation = tribalNations.filter(tribalNation => tribalNation.name === record.tribes)[0];
    var recordTopics = getRecordTopics(record.tags);
    var recordStates = getRecordStates(record.states);
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        setImageIndex(null);
      }}
      center
    >
      {items.length > 0 && !!activeIndex && (
        <>
          <Text.H2 style={{ color: '#fff' }}>{record.title}</Text.H2>
          <MetaWrapper>
            {tribalNation && (
              <MetaStyled
                label="Tribal Nation"
                outine
                items={[{ label: record.tribes, link: `/tribal-nations/${tribalNation ? tribalNation.slug : ''}` }]}
              ></MetaStyled>
            )}
            {!!record.date && <MetaStyled label="Date" outine items={[{ label: record.date }]}></MetaStyled>}
            {!!recordTopics.length && (
              <MetaStyled
                label="Topics"
                outine
                items={recordTopics.map(topic => {
                  return { label: topic.name, link: `/topics/${topic.slug}` };
                })}
              ></MetaStyled>
            )}{' '}
            {!!recordStates.length && (
              <MetaStyled
                label="States"
                outine
                items={recordStates.map(state => {
                  return { label: state.name, link: `/states/${state.slug}` };
                })}
              ></MetaStyled>
            )}
          </MetaWrapper>
          <img src={iiifImage(record, 600)} alt="" />
        </>
      )}
    </Modal>
  );
};

export default RecordModal;
