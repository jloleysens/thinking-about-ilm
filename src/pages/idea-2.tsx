import React from 'react';
import {
  EuiButtonEmpty,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiForm,
  EuiFormRow,
  EuiFieldNumber,
  EuiFieldText,
  EuiRadioGroup,
} from '@elastic/eui';

import { NavButton } from '../components/nav_button';
import { Timeline } from '../components/timeline';

import '../themes/theme_light.scss';
import './index.scss';

export default () => (
  <EuiPage restrictWidth>
    <EuiPageBody>
      <EuiPageHeader>
        <EuiPageHeaderSection>
          <EuiTitle size="l">
            <h1>Data Tiers, ILM &amp; Data Retention</h1>
          </EuiTitle>
        </EuiPageHeaderSection>
      </EuiPageHeader>
      <EuiPageContent>
        <EuiTitle size="l">
          <h2>Edit policy</h2>
        </EuiTitle>
        <EuiSpacer size="m" />
        <EuiFormRow label="Policy name">
          <EuiFieldText value="My policy" />
        </EuiFormRow>
        <EuiSpacer size="l" />
        <EuiTitle size="m">
          <h3>Data Retention</h3>
        </EuiTitle>
        <EuiSpacer size="m" />
        <Timeline />
        <EuiSpacer size="l" />
        <EuiForm>
          <EuiFormRow label="How long should data be retained?">
            <EuiRadioGroup
              onChange={() => {}}
              idSelected="2"
              options={
                [
                  {
                    id: '1',
                    label: 'Forever',
                  },
                  {
                    id: '2',
                    label: 'Specify time',
                  },
                ] as any
              }
            />
          </EuiFormRow>
          <EuiFormRow label="Keep data in the hot phase for">
            <EuiFieldNumber compressed value={1} append="days" />
          </EuiFormRow>
          <EuiFormRow label="Keep data in the warm phase for">
            <EuiFieldNumber compressed value={1} append="days" />
          </EuiFormRow>
          <EuiFormRow>
            <EuiButtonEmpty size="s" iconType="plusInCircle">
              Add a phase
            </EuiButtonEmpty>
          </EuiFormRow>
        </EuiForm>
        <EuiSpacer size="l" />
        <NavButton to="/">Go to page 1</NavButton>
      </EuiPageContent>
    </EuiPageBody>
    {/* <EuiBottomBar>
      <Timeline />
    </EuiBottomBar> */}
  </EuiPage>
);
