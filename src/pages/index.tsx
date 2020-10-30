import React, { useState } from 'react';
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
  EuiBottomBar,
  EuiSwitch,
} from '@elastic/eui';

import { NavButton } from '../components/nav_button';
import { Timeline } from '../components/timeline';

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

const tierIconMap = {
  hot: 'temperature',
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
  const [showSettings, setShowSettings] = useState(false);
  const phaseTitle = titleMap[phase];
  const tierClass = tierClassMap[tier];
  const tierTitle = titleMap[tier];
  const tierIcon = tierIconMap[tier];
  return (
    <div className="outer-container">
      <div
        className={`floating-panels-container ${
          noBottomConnector ? '' : 'floating-panels-container--bottom-connector'
        }`}>
        <EuiPanel className="phase-container" hasShadow={false}>
          <EuiFlexGroup
            direction="row"
            justifyContent="center"
            alignItems="center">
            <EuiFlexItem>
              <EuiTitle size="s">
                <h2>{phaseTitle} phase</h2>
              </EuiTitle>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiSwitch label="Active" checked={true} onChange={() => {}} />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty size="xs">Edit</EuiButtonEmpty>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer size="m" />
          <EuiFlexGroup gutterSize="s" direction="column">
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
          </EuiFlexGroup>
        </EuiPanel>
        <div className={`tier-container ${tierClass}`}>
          <div className="tier-container__content">
            <EuiFlexGroup justifyContent="spaceBetween" gutterSize="none">
              <EuiFlexItem grow={false}>
                <EuiText size="xs">
                  <h3>{tierTitle} tier</h3>
                </EuiText>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiFlexGroup>
                  <EuiFlexItem>
                    <EuiButtonEmpty style={{ height: '25px' }} size="s">
                      View Details
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

export default () => {
  const [showTimeline, setShowTimeline] = useState(false);
  return (
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
          <EuiButton onClick={() => setShowTimeline(v => !v)}>
            Toggle timeline
          </EuiButton>
          <EuiSpacer size="m" />
          <EuiTitle size="m">
            <h2>Happy path</h2>
          </EuiTitle>
          <EuiSpacer size="xxl" />
          <EuiTitle size="s">
            <h3>Data retention overview</h3>
          </EuiTitle>
          <EuiSpacer size="m" />
          <Timeline />
          <EuiSpacer size="m" />
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
          <NavButton to="/idea-2">Go to page 2</NavButton>
        </EuiPageContent>
      </EuiPageBody>
      {showTimeline && (
        <EuiBottomBar>
          <Timeline />
        </EuiBottomBar>
      )}
    </EuiPage>
  );
};
