import { css } from 'styled-components';
import * as frontline from '#styles/frontline';

const ReactTabsStyles = css`
  .react-tabs {
    &__tab {
      align-items: center;
      display: flex;
      flex-direction: row;
      border-bottom: 3px solid transparent;
      padding: 10px 0 10px;
      margin-right: 40px;

      &--disabled {
      }
      &--selected {
        border-bottom: 3px solid ${props => props.theme.colors.blue};
      }

      > *:first-child {
        margin-right: 10px;
      }
    }

    &__tab-list {
      display: flex;
      border-bottom: 1px solid ${props => props.theme.colors.blue};
      flex-direction: row;
      flex-wrap: no-wrap;
      overflow-x: scroll;
    }

    &__tab-panel {
      &--selected {
      }
    }
  }
`;

export default ReactTabsStyles;
