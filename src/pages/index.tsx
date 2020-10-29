import React from 'react';
import {
  EuiButton,
  EuiButtonEmpty,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiText,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiSpacer,
  EuiFormRow,
  EuiSelect,
  EuiHorizontalRule,
} from '@elastic/eui';

import '../themes/theme_light.scss';
import './index.scss';

const tierClassMap = {
  hot: 'tier-container--hot-tier',
  warm: 'tier-container--warm-tier',
  cold: 'tier-container--cold-tier',
};

const titleMap = {
  hot: 'Hot',
  warm: 'Warm',
  cold: 'Cold',
};

const Phase = ({
  phase,
  tier,
  noBottomConnector,
}: {
  phase: keyof typeof tierClassMap;
  tier: keyof typeof tierClassMap;
  noBottomConnector?: boolean;
}) => {
  const phaseTitle = titleMap[phase];
  const tierClass = tierClassMap[tier];
  const tierTitle = titleMap[tier];
  return (
    <div className="outer-container">
      <div
        className={`floating-panels-container ${
          noBottomConnector ? '' : 'floating-panels-container--bottom-connector'
        }`}>
        <EuiPanel className="phase-container" hasShadow={false}>
          <EuiTitle size="m">
            <h2>{phaseTitle} phase</h2>
          </EuiTitle>
          <EuiSpacer size="m" />
          <EuiFlexGroup direction="column">
            <EuiFlexItem>
              <EuiFormRow>
                <EuiFlexGroup gutterSize="s" alignItems="center">
                  <EuiFlexItem grow={false}>
                    <EuiText>Keep data in this phase for</EuiText>
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiSelect
                      compressed
                      options={[
                        { value: 1, text: '1' },
                        { value: 2, text: '2' },
                        { value: 4, text: '4' },
                        { value: 8, text: '8' },
                      ]}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiText>days.</EuiText>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiFormRow>
                <EuiButton iconType="controlsVertical">
                  Advanced settings
                </EuiButton>
              </EuiFormRow>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPanel>
        <div className={`tier-container ${tierClass}`}>
          <div className="tier-container__content">
            <EuiFlexGroup justifyContent="spaceBetween" gutterSize="none">
              <EuiFlexItem grow={false}>
                <EuiText size="s">
                  <h3>{tierTitle} tier</h3>
                </EuiText>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiFlexGroup>
                  <EuiFlexItem>
                    <EuiButtonEmpty style={{ height: '25px' }} size="s">
                      View Nodes
                    </EuiButtonEmpty>
                  </EuiFlexItem>
                  <EuiFlexItem>
                    <EuiButtonEmpty style={{ height: '25px' }} size="s">
                      Change Allocation
                    </EuiButtonEmpty>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
            </EuiFlexGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

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
        <EuiTitle size="m">
          <h2>Happy path</h2>
        </EuiTitle>
        <EuiSpacer size="xxl" />
        <Phase phase="hot" tier="hot" />
        <EuiSpacer size="m" />
        <Phase phase="warm" tier="warm" />
        <EuiSpacer size="m" />
        <Phase phase="cold" tier="cold" noBottomConnector />
        <EuiSpacer size="xxl" />
        <EuiHorizontalRule />
        <EuiTitle size="m">
          <h2>All hot</h2>
        </EuiTitle>
        <EuiSpacer size="xxl" />
        <Phase phase="hot" tier="hot" />
        <EuiSpacer size="m" />
        <Phase phase="warm" tier="hot" />
        <EuiSpacer size="m" />
        <Phase phase="cold" tier="hot" noBottomConnector />
        <EuiSpacer size="xxl" />
        <EuiHorizontalRule />
        <EuiSpacer size="xxl" />
        <EuiTitle size="m">
          <h2>Hot, hot, warm</h2>
        </EuiTitle>
        <EuiSpacer size="xxl" />
        <Phase phase="hot" tier="hot" />
        <EuiSpacer size="m" />
        <Phase phase="warm" tier="hot" />
        <EuiSpacer size="m" />
        <Phase phase="cold" tier="cold" noBottomConnector />
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
);
